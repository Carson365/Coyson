using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BookstoreApiClean.Models;


public class TransactionItem
{
    [Key]
    public int TransItemID { get; set; }

    public int TransID { get; set; }

    [ForeignKey("TransID")]
    public Transaction Transaction { get; set; } = null!;

    public int BookID { get; set; }

    [ForeignKey("BookID")]
    public Book Book { get; set; } = null!;

    public int Quantity { get; set; }
    public decimal PriceAtPurchase { get; set; }
}
