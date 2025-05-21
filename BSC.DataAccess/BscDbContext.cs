using BSC.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace BSC.DataAccess
{
    public class BscDbContext : DbContext
    {
        public BscDbContext(DbContextOptions<BscDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Unique constraints
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<Product>()
                .HasIndex(p => p.ProductKey)
                .IsUnique();

            // Order → OrderItems (one-to-many)
            modelBuilder.Entity<Order>()
                .HasMany(o => o.Items)
                .WithOne(i => i.Order)
                .HasForeignKey(i => i.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // Product → OrderItems (one-to-many)
            modelBuilder.Entity<Product>()
                .HasMany<OrderItem>() // not a navigation in Product, just declare relationship
                .WithOne(i => i.Product)
                .HasForeignKey(i => i.ProductId)
                .OnDelete(DeleteBehavior.Restrict); // or Cascade if appropriate

            base.OnModelCreating(modelBuilder);
        }
    }
}
