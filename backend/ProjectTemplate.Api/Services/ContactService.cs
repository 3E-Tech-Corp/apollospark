using Dapper;
using Microsoft.Data.SqlClient;
using ProjectTemplate.Api.Models;

namespace ProjectTemplate.Api.Services;

public class ContactService
{
    private readonly IConfiguration _config;

    public ContactService(IConfiguration config)
    {
        _config = config;
    }

    private SqlConnection CreateConnection() =>
        new(_config.GetConnectionString("DefaultConnection"));

    public async Task<ContactMessage> CreateAsync(CreateContactMessageRequest request)
    {
        using var conn = CreateConnection();
        var id = await conn.QuerySingleAsync<int>(@"
            INSERT INTO ContactMessages (Name, Email, Subject, Message)
            OUTPUT INSERTED.Id
            VALUES (@Name, @Email, @Subject, @Message)",
            request);
        return (await GetByIdAsync(id))!;
    }

    public async Task<IEnumerable<ContactMessage>> GetAllAsync()
    {
        using var conn = CreateConnection();
        return await conn.QueryAsync<ContactMessage>(
            "SELECT * FROM ContactMessages ORDER BY CreatedAt DESC");
    }

    public async Task<ContactMessage?> GetByIdAsync(int id)
    {
        using var conn = CreateConnection();
        return await conn.QueryFirstOrDefaultAsync<ContactMessage>(
            "SELECT * FROM ContactMessages WHERE Id = @Id", new { Id = id });
    }

    public async Task<bool> MarkReadAsync(int id)
    {
        using var conn = CreateConnection();
        var rows = await conn.ExecuteAsync(
            "UPDATE ContactMessages SET IsRead = 1 WHERE Id = @Id", new { Id = id });
        return rows > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        using var conn = CreateConnection();
        var rows = await conn.ExecuteAsync(
            "DELETE FROM ContactMessages WHERE Id = @Id", new { Id = id });
        return rows > 0;
    }
}
