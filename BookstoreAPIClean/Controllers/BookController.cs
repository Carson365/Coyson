using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookstoreApiClean.Data;
using BookstoreApiClean.Models;

namespace BookstoreApiClean.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookController : ControllerBase
{
    private readonly AppDbContext _context;
    public BookController(AppDbContext context) => _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetAll() =>
        await _context.Books.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetById(int id)
    {
        var book = await _context.Books.FindAsync(id);
        return book is null ? NotFound() : book;
    }

    [HttpPost]
    public async Task<ActionResult<Book>> Create(Book book)
    {
        _context.Books.Add(book);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = book.BookID }, book);
    }
}
