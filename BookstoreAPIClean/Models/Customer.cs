using System.ComponentModel.DataAnnotations;

namespace BookstoreApiClean.Models
{
    public class Customer
    {
        [Key]
        public int CustID { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime DateOfAccountCreation { get; set; } = DateTime.UtcNow;
        public int Points { get; set; }

        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}
