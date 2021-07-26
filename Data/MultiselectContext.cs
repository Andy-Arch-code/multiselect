using Microsoft.EntityFrameworkCore;
using multiselect.Models ;
using System;

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

            modelBuilder.HasSequence<int>("OrderNumbers", schema: "shared")
                .StartsAt(1)
                .IncrementsBy(1);


            modelBuilder.Entity<UserModel>()
                .HasData(
            new UserModel { ID = 1, FullName = "Carson Li", Selected = false, SelectedDate = DateTime.Parse("2005-09-01") },
            new UserModel { ID = 2, FullName = "Meredith Ivanova", Selected = false, SelectedDate = DateTime.Parse("2002-09-01") },
            new UserModel { ID = 3, FullName = "Arturo Jopalov", Selected = false, SelectedDate = DateTime.Parse("2003-09-01") },
            new UserModel { ID = 4, FullName = "Gytis Peskha", Selected = false, SelectedDate = DateTime.Parse("2002-09-01") },
            new UserModel { ID = 5, FullName = "Yan Li", Selected = false, SelectedDate = DateTime.Parse("2002-09-01") },
            new UserModel { ID = 6, FullName = "Peggy Poo", Selected = false, SelectedDate = DateTime.Parse("2001-09-01") },
            new UserModel { ID = 7, FullName = "Laura Dee", Selected = false, SelectedDate = DateTime.Parse("2003-09-01") },
            new UserModel { ID = 8, FullName = "Nina Nani", Selected = false, SelectedDate = DateTime.Parse("2005-09-01") }
    );
        }
    }
}
