using Dapper;
using Microsoft.Data.SqlClient;
using ProjectTemplate.Api.Models;

namespace ProjectTemplate.Api.Services;

public class EventService
{
    private readonly IConfiguration _config;

    public EventService(IConfiguration config)
    {
        _config = config;
    }

    private SqlConnection CreateConnection() =>
        new(_config.GetConnectionString("DefaultConnection"));

    public async Task<IEnumerable<Event>> GetAllAsync()
    {
        using var conn = CreateConnection();
        return await conn.QueryAsync<Event>(
            "SELECT * FROM Events ORDER BY EventDate DESC, SortOrder");
    }

    public async Task<IEnumerable<Event>> GetUpcomingAsync()
    {
        using var conn = CreateConnection();
        return await conn.QueryAsync<Event>(
            "SELECT * FROM Events WHERE IsUpcoming = 1 ORDER BY EventDate ASC, SortOrder");
    }

    public async Task<IEnumerable<Event>> GetPastAsync()
    {
        using var conn = CreateConnection();
        return await conn.QueryAsync<Event>(
            "SELECT * FROM Events WHERE IsUpcoming = 0 ORDER BY EventDate DESC, SortOrder");
    }

    public async Task<Event?> GetByIdAsync(int id)
    {
        using var conn = CreateConnection();
        return await conn.QueryFirstOrDefaultAsync<Event>(
            "SELECT * FROM Events WHERE Id = @Id", new { Id = id });
    }

    public async Task<Event> CreateAsync(CreateEventRequest request)
    {
        using var conn = CreateConnection();
        var id = await conn.QuerySingleAsync<int>(@"
            INSERT INTO Events (Title, Description, EventDate, Location, ImageUrl, IsUpcoming, SortOrder)
            OUTPUT INSERTED.Id
            VALUES (@Title, @Description, @EventDate, @Location, @ImageUrl, @IsUpcoming, @SortOrder)",
            request);
        return (await GetByIdAsync(id))!;
    }

    public async Task<Event?> UpdateAsync(int id, UpdateEventRequest request)
    {
        using var conn = CreateConnection();
        var existing = await GetByIdAsync(id);
        if (existing == null) return null;

        await conn.ExecuteAsync(@"
            UPDATE Events SET
                Title = COALESCE(@Title, Title),
                Description = COALESCE(@Description, Description),
                EventDate = COALESCE(@EventDate, EventDate),
                Location = COALESCE(@Location, Location),
                ImageUrl = COALESCE(@ImageUrl, ImageUrl),
                IsUpcoming = COALESCE(@IsUpcoming, IsUpcoming),
                SortOrder = COALESCE(@SortOrder, SortOrder),
                UpdatedAt = GETUTCDATE()
            WHERE Id = @Id",
            new
            {
                request.Title,
                request.Description,
                request.EventDate,
                request.Location,
                request.ImageUrl,
                request.IsUpcoming,
                request.SortOrder,
                Id = id
            });
        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        using var conn = CreateConnection();
        var rows = await conn.ExecuteAsync("DELETE FROM Events WHERE Id = @Id", new { Id = id });
        return rows > 0;
    }
}
