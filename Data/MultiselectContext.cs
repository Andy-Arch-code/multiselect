using Microsoft.EntityFrameworkCore;
using multiselect.Models ;

namespace multiselect.Data
{
    public class MultiselectContext : DbContext
    {
        public MultiselectContext(DbContextOptions<MultiselectContext> options) : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>().ToTable("Users");
        }
    }
}
