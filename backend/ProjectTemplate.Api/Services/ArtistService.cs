using Dapper;
using Microsoft.Data.SqlClient;
using ProjectTemplate.Api.Models;

namespace ProjectTemplate.Api.Services;

public class ArtistService
{
    private readonly IConfiguration _config;

    public ArtistService(IConfiguration config)
    {
        _config = config;
    }

    private SqlConnection CreateConnection() =>
        new(_config.GetConnectionString("DefaultConnection"));

    public async Task<IEnumerable<Artist>> GetAllAsync()
    {
        using var conn = CreateConnection();
        return await conn.QueryAsync<Artist>(
            "SELECT * FROM Artists ORDER BY SortOrder, Name");
    }

    public async Task<IEnumerable<Artist>> GetFeaturedAsync()
    {
        using var conn = CreateConnection();
        return await conn.QueryAsync<Artist>(
            "SELECT * FROM Artists WHERE Featured = 1 ORDER BY SortOrder, Name");
    }

    public async Task<Artist?> GetByIdAsync(int id)
    {
        using var conn = CreateConnection();
        return await conn.QueryFirstOrDefaultAsync<Artist>(
            "SELECT * FROM Artists WHERE Id = @Id", new { Id = id });
    }

    public async Task<Artist> CreateAsync(CreateArtistRequest request)
    {
        using var conn = CreateConnection();
        var id = await conn.QuerySingleAsync<int>(@"
            INSERT INTO Artists (Name, Instrument, Country, Bio, ImageUrl, Featured, SortOrder)
            OUTPUT INSERTED.Id
            VALUES (@Name, @Instrument, @Country, @Bio, @ImageUrl, @Featured, @SortOrder)",
            request);
        return (await GetByIdAsync(id))!;
    }

    public async Task<Artist?> UpdateAsync(int id, UpdateArtistRequest request)
    {
        using var conn = CreateConnection();
        var existing = await GetByIdAsync(id);
        if (existing == null) return null;

        await conn.ExecuteAsync(@"
            UPDATE Artists SET
                Name = COALESCE(@Name, Name),
                Instrument = COALESCE(@Instrument, Instrument),
                Country = COALESCE(@Country, Country),
                Bio = COALESCE(@Bio, Bio),
                ImageUrl = COALESCE(@ImageUrl, ImageUrl),
                Featured = COALESCE(@Featured, Featured),
                SortOrder = COALESCE(@SortOrder, SortOrder),
                UpdatedAt = GETUTCDATE()
            WHERE Id = @Id",
            new
            {
                request.Name,
                request.Instrument,
                request.Country,
                request.Bio,
                request.ImageUrl,
                request.Featured,
                request.SortOrder,
                Id = id
            });
        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        using var conn = CreateConnection();
        var rows = await conn.ExecuteAsync("DELETE FROM Artists WHERE Id = @Id", new { Id = id });
        return rows > 0;
    }
}
