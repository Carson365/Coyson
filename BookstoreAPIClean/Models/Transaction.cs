using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreApiClean.Models
{
public class Transaction
{
    [Key]
    public int TransID { get; set; }

    public int CustID { get; set; }

    [ForeignKey("CustID")]
    public Customer Customer { get; set; } = null!;

    public DateTime DatePurchased { get; set; } = DateTime.UtcNow;

    public bool hasCheckedOut { get; set; } = false;

    public int PointsUsed { get; set; } = 0;

    public ICollection<TransactionItem> Items { get; set; } = new List<TransactionItem>();
}

}
