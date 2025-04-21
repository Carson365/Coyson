using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BookstoreApiClean.Models;

public class Transaction
{
    [Key]
    public int TransID { get; set; }

    public int CustID { get; set; }

    [ForeignKey("CustID")]
    public Customer Customer { get; set; } = null!;

    public DateTime DatePurchased { get; set; } = DateTime.UtcNow;

    public ICollection<TransactionItem> Items { get; set; } = new List<TransactionItem>();
}
