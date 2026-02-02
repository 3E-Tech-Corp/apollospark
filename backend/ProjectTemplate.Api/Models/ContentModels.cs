namespace ProjectTemplate.Api.Models;

public class ContentBlock
{
    public int Id { get; set; }
    public string Key { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

public class UpdateContentBlockRequest
{
    public string? Title { get; set; }
    public string? Body { get; set; }
    public string? ImageUrl { get; set; }
    public int? SortOrder { get; set; }
}
