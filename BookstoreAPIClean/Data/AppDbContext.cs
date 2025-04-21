using Microsoft.EntityFrameworkCore;
using BookstoreApiClean.Models;

namespace BookstoreApiClean.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Book> Books => Set<Book>();
        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<Transaction> Transactions => Set<Transaction>();
        public DbSet<TransactionItem> TransactionItems => Set<TransactionItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TransactionItem>()
                .HasOne(ti => ti.Book)
                .WithMany()
                .HasForeignKey(ti => ti.BookID);

            modelBuilder.Entity<TransactionItem>()
                .HasOne(ti => ti.Transaction)
                .WithMany(t => t.Items)
                .HasForeignKey(ti => ti.TransID);
        }
    }
}
