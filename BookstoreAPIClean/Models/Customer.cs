using System.ComponentModel.DataAnnotations;

namespace BookstoreApiClean.Models
{

    public class Customer
    {
        [Key]
        public int Id { get; set; }

        [Required] [MaxLength(768)]
        public string Token { get; set; } = default!;

        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string ProfileImageUrl { get; set; } = "";
        public int Points { get; set; } = 0;
        public DateTime DateOfAccountCreation { get; set; } = DateTime.UtcNow;

        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }


}
