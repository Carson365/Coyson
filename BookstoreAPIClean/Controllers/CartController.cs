using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookstoreApiClean.Data;
using BookstoreApiClean.Models;

namespace BookstoreApiClean.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly AppDbContext _context;
    public CartController(AppDbContext context) => _context = context;

    [HttpGet("fetchcart")]
    public async Task<IActionResult> FetchCart(int userId)
    {
        var cart = await _context.Transactions
            .Include(t => t.Items)
            .ThenInclude(i => i.Book)
            .FirstOrDefaultAsync(t => t.CustID == userId && !t.hasCheckedOut);

        if (cart == null)
            return Ok(new { cartItems = new List<object>() });

        var items = cart.Items.Select(i => new
        {
            i.Book, // Full book object
            i.Quantity,
            i.PriceAtPurchase
        });

        return Ok(new { cartItems = items });
    }


    [HttpPost("addtocart")]
    public async Task<IActionResult> AddToCart(int userId, int bookId, decimal price)
    {
        var cart = await _context.Transactions
            .Include(t => t.Items)
            .FirstOrDefaultAsync(t => t.CustID == userId && !t.hasCheckedOut);

        if (cart == null)
        {
            cart = new Transaction
            {
                CustID = userId,
                hasCheckedOut = false,
                Items = new List<TransactionItem>()
            };
            _context.Transactions.Add(cart);
            await _context.SaveChangesAsync();
        }

        var existingItem = cart.Items.FirstOrDefault(i => i.BookID == bookId);

        if (existingItem != null)
        {
            existingItem.Quantity++;
        }
        else
        {
            cart.Items.Add(new TransactionItem
            {
                BookID = bookId,
                Quantity = 1,
                PriceAtPurchase = price,
                TransID = cart.TransID
            });
        }

        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpDelete("removefromcart")]
    public async Task<IActionResult> RemoveFromCart(int userId, int bookId)
    {
        var cart = await _context.Transactions
            .Include(t => t.Items)
            .FirstOrDefaultAsync(t => t.CustID == userId && !t.hasCheckedOut);

        if (cart == null) return NotFound("Cart not found");

        var item = cart.Items.FirstOrDefault(i => i.BookID == bookId);
        if (item == null) return NotFound("Item not found");

        if (item.Quantity > 1)
        {
            item.Quantity--;
        }
        else
        {
            _context.TransactionItems.Remove(item);
        }

        await _context.SaveChangesAsync();
        return Ok();
    }


    [HttpPut("updatequantity")]
public async Task<IActionResult> UpdateQuantity(int userId, int bookId, int quantity)
{
    if (quantity < 1) return BadRequest("Quantity must be at least 1");

    var cart = await _context.Transactions
        .Include(t => t.Items)
        .FirstOrDefaultAsync(t => t.CustID == userId && !t.hasCheckedOut);

    if (cart == null) return NotFound("Cart not found");

    var item = cart.Items.FirstOrDefault(i => i.BookID == bookId);
    if (item == null) return NotFound("Item not found");

    item.Quantity = quantity;
    await _context.SaveChangesAsync();

    return Ok();
}



    [HttpPost("checkout")]
public async Task<IActionResult> Checkout(int userId, [FromQuery] bool usePoints = false)
{
    var cart = await _context.Transactions
        .Include(t => t.Items)
        .FirstOrDefaultAsync(t => t.CustID == userId && !t.hasCheckedOut);

    if (cart == null) return NotFound();

    var user = await _context.Customers.FindAsync(userId);
    if (user == null) return NotFound();

    decimal subtotal = cart.Items.Sum(i => i.Quantity * i.PriceAtPurchase);
    int pointsUsed = usePoints ? Math.Min(user.Points, (int)(subtotal * 100)) : 0;
    decimal discount = pointsUsed / 100m;
    decimal totalAfterDiscount = Math.Max(subtotal - discount, 0);
    int pointsEarned = (int)(totalAfterDiscount * 5);

    cart.hasCheckedOut = true;
    cart.DatePurchased = DateTime.UtcNow;
    cart.PointsUsed = pointsUsed;

    user.Points = user.Points - pointsUsed + pointsEarned;

    await _context.SaveChangesAsync();
    return Ok(new
{
    newPointTotal = user.Points,
    pointsUsed = pointsUsed,
    pointsEarned = pointsEarned
});
}

}
