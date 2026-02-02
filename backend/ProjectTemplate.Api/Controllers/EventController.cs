using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProjectTemplate.Api.Models;

namespace ProjectTemplate.Api.Controllers;

[ApiController]
[Route("[controller]s")]
public class EventController : ControllerBase
{
    private readonly IConfiguration _config;
    private SqlConnection CreateConnection() => new(_config.GetConnectionString("DefaultConnection"));

    public EventController(IConfiguration config) => _config = config;

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        using var conn = CreateConnection();
        var events = await conn.QueryAsync<Event>("SELECT * FROM Events ORDER BY EventDate DESC");
        return Ok(events);
    }

    [HttpGet("upcoming")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUpcoming()
    {
        using var conn = CreateConnection();
        var events = await conn.QueryAsync<Event>("SELECT * FROM Events WHERE IsUpcoming = 1 ORDER BY EventDate ASC");
        return Ok(events);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(int id)
    {
        using var conn = CreateConnection();
        var ev = await conn.QueryFirstOrDefaultAsync<Event>("SELECT * FROM Events WHERE Id = @Id", new { Id = id });
        if (ev == null) return NotFound();
        return Ok(ev);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] Event ev)
    {
        using var conn = CreateConnection();
        var id = await conn.QuerySingleAsync<int>(@"
            INSERT INTO Events (Title, Description, EventDate, Location, ImageUrl, IsUpcoming, SortOrder)
            OUTPUT INSERTED.Id
            VALUES (@Title, @Description, @EventDate, @Location, @ImageUrl, @IsUpcoming, @SortOrder)", ev);
        return Ok(new { id });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] Event ev)
    {
        using var conn = CreateConnection();
        await conn.ExecuteAsync(@"
            UPDATE Events SET Title=@Title, Description=@Description, EventDate=@EventDate,
            Location=@Location, ImageUrl=@ImageUrl, IsUpcoming=@IsUpcoming, SortOrder=@SortOrder, UpdatedAt=GETUTCDATE()
            WHERE Id=@Id", new { ev.Title, ev.Description, ev.EventDate, ev.Location, ev.ImageUrl, ev.IsUpcoming, ev.SortOrder, Id = id });
        return Ok(new { message = "Updated" });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        using var conn = CreateConnection();
        await conn.ExecuteAsync("DELETE FROM Events WHERE Id=@Id", new { Id = id });
        return Ok(new { message = "Deleted" });
    }
}
