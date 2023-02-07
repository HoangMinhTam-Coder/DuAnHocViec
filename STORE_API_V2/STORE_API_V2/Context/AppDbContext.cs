using Microsoft.EntityFrameworkCore;
using STORE_API_V2.Model;

namespace STORE_API_V2.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<HoaDon> HoaDons { get; set; }
        public DbSet<ChiTietHoaDon> ChiTietHoaDons { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("USER");
            modelBuilder.Entity<Product>().ToTable("PRODUCT");
            modelBuilder.Entity<Cart>().ToTable("CART");
            modelBuilder.Entity<HoaDon>().ToTable("HOADON");
            modelBuilder.Entity<ChiTietHoaDon>().ToTable("CHITIETHOADON");
        }
    }
}
