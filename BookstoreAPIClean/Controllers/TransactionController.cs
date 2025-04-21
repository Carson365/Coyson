using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookstoreApiClean.Data;
using BookstoreApiClean.Models;

namespace BookstoreApiClean.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionController : ControllerBase
{
    private readonly AppDbContext _context;
    public TransactionController(AppDbContext context) => _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transaction>>> GetAll()
    {
        return await _context.Transactions
            .Include(t => t.Customer)
            .Include(t => t.Items)
            .ThenInclude(i => i.Book)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Transaction>> GetById(int id)
    {
        var transaction = await _context.Transactions
            .Include(t => t.Customer)
            .Include(t => t.Items)
            .ThenInclude(i => i.Book)
            .FirstOrDefaultAsync(t => t.TransID == id);

        return transaction is null ? NotFound() : transaction;
    }

    [HttpPost]
    public async Task<ActionResult<Transaction>> Create(Transaction transaction)
    {
        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = transaction.TransID }, transaction);
    }
}
