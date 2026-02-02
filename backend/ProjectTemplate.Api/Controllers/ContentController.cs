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
    public async Task<IActionResult> GetAll()
    {
        using var conn = CreateConnection();
        var blocks = await conn.QueryAsync<ContentBlock>("SELECT * FROM ContentBlocks ORDER BY SortOrder");
        return Ok(blocks);
    }

    [HttpGet("{key}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetByKey(string key)
    {
        using var conn = CreateConnection();
        var block = await conn.QueryFirstOrDefaultAsync<ContentBlock>("SELECT * FROM ContentBlocks WHERE [Key] = @Key", new { Key = key });
        if (block == null) return NotFound();
        return Ok(block);
    }

    [HttpPut("{key}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(string key, [FromBody] ContentBlock block)
    {
        using var conn = CreateConnection();
        var existing = await conn.QueryFirstOrDefaultAsync<ContentBlock>("SELECT * FROM ContentBlocks WHERE [Key] = @Key", new { Key = key });
        if (existing == null)
        {
            await conn.ExecuteAsync(@"
                INSERT INTO ContentBlocks ([Key], Title, Body, ImageUrl, SortOrder)
                VALUES (@Key, @Title, @Body, @ImageUrl, @SortOrder)", new { Key = key, block.Title, block.Body, block.ImageUrl, block.SortOrder });
        }
        else
        {
            await conn.ExecuteAsync(@"
                UPDATE ContentBlocks SET Title=@Title, Body=@Body, ImageUrl=@ImageUrl, SortOrder=@SortOrder, UpdatedAt=GETUTCDATE()
                WHERE [Key]=@Key", new { Key = key, block.Title, block.Body, block.ImageUrl, block.SortOrder });
        }
        return Ok(new { message = "Updated" });
    }
}
