using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookstoreApiClean.Data;
using BookstoreApiClean.Models;

namespace BookstoreApiClean.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;
    public UserController(AppDbContext context) => _context = context;

    [HttpPost("login")]
    public async Task<ActionResult<object>> Login(UserLoginDto dto)
    {
        var truncatedToken = dto.token.Length > 768 ? dto.token.Substring(0, 768) : dto.token;

        var user = await _context.Customers.FirstOrDefaultAsync(u => u.Token == truncatedToken);

        if (user == null)
        {
            user = new Customer
            {
                Token = truncatedToken,
                Name = dto.name,
                Email = dto.email,
                ProfileImageUrl = dto.profileImg,
                Points = 0,
                DateOfAccountCreation = DateTime.UtcNow
            };

            _context.Customers.Add(user);
            await _context.SaveChangesAsync();
        }

        return Ok(new
        {
            id = user.Id,
            token = user.Token,
            name = user.Name,
            email = user.Email,
            profileImg = user.ProfileImageUrl,
            points = user.Points,
            created = user.DateOfAccountCreation
        });
    }


    [HttpGet("bytoken/{token}")]
    public async Task<ActionResult<Customer>> GetByToken(string token)
    {
        var user = await _context.Customers.FirstOrDefaultAsync(u => u.Token == token);
        return user is null ? NotFound() : Ok(user);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Customer>> GetById(int id)
    {
        var user = await _context.Customers.FindAsync(id);
        return user is null ? NotFound() : Ok(user);
    }
}

public class UserLoginDto
{
    public string token { get; set; } = default!;
    public string name { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string profileImg { get; set; } = string.Empty;
}
