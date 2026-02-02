using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProjectTemplate.Api.Models;

namespace ProjectTemplate.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ContactController : ControllerBase
{
    private readonly IConfiguration _config;
    private SqlConnection CreateConnection() => new(_config.GetConnectionString("DefaultConnection"));

    public ContactController(IConfiguration config) => _config = config;

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Submit([FromBody] CreateContactMessageRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Message))
            return BadRequest(new { message = "Name, email, and message are required." });

        using var conn = CreateConnection();
        await conn.ExecuteAsync(@"
            INSERT INTO ContactMessages (Name, Email, Subject, Message)
            VALUES (@Name, @Email, @Subject, @Message)", request);
        return Ok(new { message = "Thank you for reaching out! We'll get back to you soon." });
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        using var conn = CreateConnection();
        var messages = await conn.QueryAsync<ContactMessage>("SELECT * FROM ContactMessages ORDER BY CreatedAt DESC");
        return Ok(messages);
    }

    [HttpPut("{id}/read")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> MarkRead(int id)
    {
        using var conn = CreateConnection();
        await conn.ExecuteAsync("UPDATE ContactMessages SET IsRead = 1 WHERE Id = @Id", new { Id = id });
        return Ok(new { message = "Marked as read" });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        using var conn = CreateConnection();
        await conn.ExecuteAsync("DELETE FROM ContactMessages WHERE Id = @Id", new { Id = id });
        return Ok(new { message = "Deleted" });
    }
}
