namespace ProjectTemplate.Api.Models;

public class Artist
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Instrument { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public bool Featured { get; set; }
    public int SortOrder { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

public class CreateArtistRequest
{
    public string Name { get; set; } = string.Empty;
    public string Instrument { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public bool Featured { get; set; }
    public int SortOrder { get; set; }
}

public class UpdateArtistRequest
{
    public string? Name { get; set; }
    public string? Instrument { get; set; }
    public string? Country { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }
    public bool? Featured { get; set; }
    public int? SortOrder { get; set; }
}
