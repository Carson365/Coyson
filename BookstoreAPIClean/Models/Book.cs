using System.ComponentModel.DataAnnotations;

namespace BookstoreApiClean.Models
{
    public class Book
    {
        [Key]
        public int BookID { get; set; }
        public int? GenreID { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Subtitle { get; set; }
        public string? Authors { get; set; }
        public string? Publisher { get; set; }
        public string? Description { get; set; }
        public int? PageCount { get; set; }
        public string? Categories { get; set; }
        public float? Rating { get; set; }
        public string? MaturityRating { get; set; }
        public string? Image { get; set; }
        public decimal? Price { get; set; }
    }
}
