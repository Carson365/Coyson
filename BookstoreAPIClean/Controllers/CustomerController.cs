using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookstoreApiClean.Data;
using BookstoreApiClean.Models;

namespace BookstoreApiClean.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomerController : ControllerBase
{
    private readonly AppDbContext _context;
    public CustomerController(AppDbContext context) => _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Customer>>> GetAll() =>
        await _context.Customers.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Customer>> GetById(int id)
    {
        var customer = await _context.Customers.FindAsync(id);
        return customer is null ? NotFound() : customer;
    }

    [HttpPost]
    public async Task<ActionResult<Customer>> Create(Customer customer)
    {
        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = customer.CustID }, customer);
    }
}
