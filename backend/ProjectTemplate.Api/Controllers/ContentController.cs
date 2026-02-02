using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProjectTemplate.Api.Models;

namespace ProjectTemplate.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ContentController : ControllerBase
{
    private readonly IConfiguration _config;
    private SqlConnection CreateConnection() => new(_config.GetConnectionString("DefaultConnection"));

    public ContentController(IConfiguration config) => _config = config;

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll([FromQuery] string locale = "en")
    {
        using var conn = CreateConnection();
        var blocks = await conn.QueryAsync<ContentBlock>(
            "SELECT * FROM ContentBlocks WHERE Locale = @Locale ORDER BY SortOrder",
            new { Locale = locale });
        return Ok(blocks);
    }

    [HttpGet("{key}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetByKey(string key, [FromQuery] string locale = "en")
    {
        using var conn = CreateConnection();
        var block = await conn.QueryFirstOrDefaultAsync<ContentBlock>(
            "SELECT * FROM ContentBlocks WHERE [Key] = @Key AND Locale = @Locale",
            new { Key = key, Locale = locale });
        if (block == null) return NotFound();
        return Ok(block);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateById(int id, [FromBody] UpdateContentBlockRequest block)
    {
        using var conn = CreateConnection();
        var existing = await conn.QueryFirstOrDefaultAsync<ContentBlock>(
            "SELECT * FROM ContentBlocks WHERE Id = @Id", new { Id = id });
        if (existing == null) return NotFound();

        await conn.ExecuteAsync(@"
            UPDATE ContentBlocks SET 
                Title = COALESCE(@Title, Title), 
                Body = COALESCE(@Body, Body), 
                ImageUrl = COALESCE(@ImageUrl, ImageUrl), 
                SortOrder = COALESCE(@SortOrder, SortOrder), 
                UpdatedAt = GETUTCDATE()
            WHERE Id = @Id",
            new { block.Title, block.Body, block.ImageUrl, block.SortOrder, Id = id });
        
        var updated = await conn.QueryFirstOrDefaultAsync<ContentBlock>(
            "SELECT * FROM ContentBlocks WHERE Id = @Id", new { Id = id });
        return Ok(updated);
    }

    [HttpPut("key/{key}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateByKey(string key, [FromQuery] string locale = "en", [FromBody] UpdateContentBlockRequest? block = null)
    {
        if (block == null) return BadRequest(new { message = "Request body required" });

        using var conn = CreateConnection();
        var existing = await conn.QueryFirstOrDefaultAsync<ContentBlock>(
            "SELECT * FROM ContentBlocks WHERE [Key] = @Key AND Locale = @Locale",
            new { Key = key, Locale = locale });

        if (existing == null)
        {
            // Upsert: create new block for this locale
            var id = await conn.QuerySingleAsync<int>(@"
                INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder, Locale)
                OUTPUT INSERTED.Id
                VALUES (@Key, @Title, @Body, @ImageUrl, @SortOrder, @Locale)",
                new { Key = key, Title = block.Title ?? "", Body = block.Body ?? "", ImageUrl = block.ImageUrl ?? "", SortOrder = block.SortOrder ?? 0, Locale = locale });
            var created = await conn.QueryFirstOrDefaultAsync<ContentBlock>(
                "SELECT * FROM ContentBlocks WHERE Id = @Id", new { Id = id });
            return Ok(created);
        }
        else
        {
            await conn.ExecuteAsync(@"
                UPDATE ContentBlocks SET 
                    Title = COALESCE(@Title, Title), 
                    Body = COALESCE(@Body, Body), 
                    ImageUrl = COALESCE(@ImageUrl, ImageUrl), 
                    SortOrder = COALESCE(@SortOrder, SortOrder), 
                    UpdatedAt = GETUTCDATE()
                WHERE [Key] = @Key AND Locale = @Locale",
                new { block.Title, block.Body, block.ImageUrl, block.SortOrder, Key = key, Locale = locale });
            var updated = await conn.QueryFirstOrDefaultAsync<ContentBlock>(
                "SELECT * FROM ContentBlocks WHERE [Key] = @Key AND Locale = @Locale",
                new { Key = key, Locale = locale });
            return Ok(updated);
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] ContentBlock block)
    {
        using var conn = CreateConnection();
        var id = await conn.QuerySingleAsync<int>(@"
            INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder, Locale)
            OUTPUT INSERTED.Id
            VALUES (@Key, @Title, @Body, @ImageUrl, @SortOrder, @Locale)", block);
        return Ok(new { id });
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        using var conn = CreateConnection();
        await conn.ExecuteAsync("DELETE FROM ContentBlocks WHERE Id = @Id", new { Id = id });
        return Ok(new { message = "Deleted" });
    }
}
