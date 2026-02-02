using Dapper;
using Microsoft.Data.SqlClient;
using ProjectTemplate.Api.Models;

namespace ProjectTemplate.Api.Services;

public class ContentService
{
    private readonly IConfiguration _config;

    public ContentService(IConfiguration config)
    {
        _config = config;
    }

    private SqlConnection CreateConnection() =>
        new(_config.GetConnectionString("DefaultConnection"));

    public async Task<IEnumerable<ContentBlock>> GetAllAsync()
    {
        using var conn = CreateConnection();
        return await conn.QueryAsync<ContentBlock>(
            "SELECT * FROM ContentBlocks ORDER BY SortOrder, [Key]");
    }

    public async Task<ContentBlock?> GetByKeyAsync(string key)
    {
        using var conn = CreateConnection();
        return await conn.QueryFirstOrDefaultAsync<ContentBlock>(
            "SELECT * FROM ContentBlocks WHERE [Key] = @Key", new { Key = key });
    }

    public async Task<ContentBlock?> GetByIdAsync(int id)
    {
        using var conn = CreateConnection();
        return await conn.QueryFirstOrDefaultAsync<ContentBlock>(
            "SELECT * FROM ContentBlocks WHERE Id = @Id", new { Id = id });
    }

    public async Task<ContentBlock?> UpdateAsync(int id, UpdateContentBlockRequest request)
    {
        using var conn = CreateConnection();
        var existing = await GetByIdAsync(id);
        if (existing == null) return null;

        await conn.ExecuteAsync(@"
            UPDATE ContentBlocks SET
                Title = COALESCE(@Title, Title),
                Body = COALESCE(@Body, Body),
                ImageUrl = COALESCE(@ImageUrl, ImageUrl),
                SortOrder = COALESCE(@SortOrder, SortOrder),
                UpdatedAt = GETUTCDATE()
            WHERE Id = @Id",
            new
            {
                request.Title,
                request.Body,
                request.ImageUrl,
                request.SortOrder,
                Id = id
            });
        return await GetByIdAsync(id);
    }

    public async Task<ContentBlock?> UpdateByKeyAsync(string key, UpdateContentBlockRequest request)
    {
        using var conn = CreateConnection();
        var existing = await GetByKeyAsync(key);
        if (existing == null) return null;

        await conn.ExecuteAsync(@"
            UPDATE ContentBlocks SET
                Title = COALESCE(@Title, Title),
                Body = COALESCE(@Body, Body),
                ImageUrl = COALESCE(@ImageUrl, ImageUrl),
                SortOrder = COALESCE(@SortOrder, SortOrder),
                UpdatedAt = GETUTCDATE()
            WHERE [Key] = @Key",
            new
            {
                request.Title,
                request.Body,
                request.ImageUrl,
                request.SortOrder,
                Key = key
            });
        return await GetByKeyAsync(key);
    }
}
