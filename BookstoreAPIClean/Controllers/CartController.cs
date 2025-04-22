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

    [HttpPost("login")]
    public async Task<ActionResult<object>> Login(string username, string password)
    {
        var user = await _context.Customers
            .FirstOrDefaultAsync(c => c.Email == username && c.Password == password);

        if (user == null)
        {
            user = new Customer
            {
                Email = username,
                Password = password,
                FirstName = "",
                LastName = ""
            };
            _context.Customers.Add(user);
            await _context.SaveChangesAsync();
        }

        var cart = await _context.Transactions
            .Include(t => t.Items)
            .Where(t => t.CustID == user.CustID && !t.hasCheckedOut)
            .FirstOrDefaultAsync();

        var cartItems = cart?.Items
            .Select(i => (object)new
            {
                i.BookID,
                i.Quantity,
                i.PriceAtPurchase
            }) ?? new List<object>();

        return Ok(new
        {
            userId = user.CustID,
            cartItems
        });
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

    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout(int userId)
    {
        var cart = await _context.Transactions
            .FirstOrDefaultAsync(t => t.CustID == userId && !t.hasCheckedOut);

        if (cart != null)
        {
            cart.hasCheckedOut = true;
            cart.DatePurchased = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }

        return Ok();
    }
}