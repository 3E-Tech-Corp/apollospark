using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProjectTemplate.Api.Models;

namespace ProjectTemplate.Api.Controllers;

[ApiController]
[Route("[controller]s")]
public class ArtistController : ControllerBase
{
    private readonly IConfiguration _config;
    private SqlConnection CreateConnection() => new(_config.GetConnectionString("DefaultConnection"));

    public ArtistController(IConfiguration config) => _config = config;

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        using var conn = CreateConnection();
        var artists = await conn.QueryAsync<Artist>("SELECT * FROM Artists ORDER BY SortOrder, Name");
        return Ok(artists);
    }

    [HttpGet("featured")]
    [AllowAnonymous]
    public async Task<IActionResult> GetFeatured()
    {
        using var conn = CreateConnection();
        var artists = await conn.QueryAsync<Artist>("SELECT * FROM Artists WHERE Featured = 1 ORDER BY SortOrder, Name");
        return Ok(artists);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(int id)
    {
        using var conn = CreateConnection();
        var artist = await conn.QueryFirstOrDefaultAsync<Artist>("SELECT * FROM Artists WHERE Id = @Id", new { Id = id });
        if (artist == null) return NotFound();
        return Ok(artist);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] Artist artist)
    {
        using var conn = CreateConnection();
        var id = await conn.QuerySingleAsync<int>(@"
            INSERT INTO Artists (Name, Instrument, Country, Bio, ImageUrl, Featured, SortOrder)
            OUTPUT INSERTED.Id
            VALUES (@Name, @Instrument, @Country, @Bio, @ImageUrl, @Featured, @SortOrder)", artist);
        return Ok(new { id });
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] Artist artist)
    {
        using var conn = CreateConnection();
        await conn.ExecuteAsync(@"
            UPDATE Artists SET Name=@Name, Instrument=@Instrument, Country=@Country, Bio=@Bio,
            ImageUrl=@ImageUrl, Featured=@Featured, SortOrder=@SortOrder, UpdatedAt=GETUTCDATE()
            WHERE Id=@Id", new { artist.Name, artist.Instrument, artist.Country, artist.Bio, artist.ImageUrl, artist.Featured, artist.SortOrder, Id = id });
        return Ok(new { message = "Updated" });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        using var conn = CreateConnection();
        await conn.ExecuteAsync("DELETE FROM Artists WHERE Id=@Id", new { Id = id });
        return Ok(new { message = "Deleted" });
    }
}
