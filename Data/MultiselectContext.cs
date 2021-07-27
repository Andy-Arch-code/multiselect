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
            new UserModel { ID = 2, FullName = "Meredith Backpfeifengesicht", Selected = false, SelectedDate = DateTime.Parse("2002-09-01") },
            new UserModel { ID = 3, FullName = "Arturo Jopalov", Selected = false, SelectedDate = DateTime.Parse("2003-09-01") },
            new UserModel { ID = 4, FullName = "Gytis Peshka", Selected = false, SelectedDate = DateTime.Parse("2002-09-01") },
            new UserModel { ID = 5, FullName = "Yan Li", Selected = false, SelectedDate = DateTime.Parse("2002-09-01") },
            new UserModel { ID = 6, FullName = "Peggy Poo", Selected = false, SelectedDate = DateTime.Parse("2001-09-01") },
            new UserModel { ID = 7, FullName = "Laura Dee", Selected = false, SelectedDate = DateTime.Parse("2003-09-01") },
            new UserModel { ID = 8, FullName = "Nina Nani", Selected = false, SelectedDate = DateTime.Parse("2005-09-01") },
            new UserModel { ID = 9, FullName = "Ivan Ivanov", Selected = false, SelectedDate = DateTime.Parse("2005-09-01") },
            new UserModel { ID = 10, FullName = "Zhang Wei", Selected = false, SelectedDate = DateTime.Parse("2002-09-01") },
            new UserModel { ID = 11, FullName = "Lei Ying Lo", Selected = false, SelectedDate = DateTime.Parse("2003-09-01") },
            new UserModel { ID = 12, FullName = "Yu Stin Ki Pu", Selected = false, SelectedDate = DateTime.Parse("2002-09-01") },
            new UserModel { ID = 13, FullName = "Ai Bang Mai Ni", Selected = false, SelectedDate = DateTime.Parse("2002-09-01") },
            new UserModel { ID = 14, FullName = "Wai Fu Pi", Selected = false, SelectedDate = DateTime.Parse("2001-09-01") },
            new UserModel { ID = 15, FullName = "Armpid Stiki", Selected = false, SelectedDate = DateTime.Parse("2003-09-01") },
            new UserModel { ID = 16, FullName = "Madam Uke Kabore", Selected = false, SelectedDate = DateTime.Parse("2005-09-01")},
            new UserModel { ID = 17, FullName = "Hank Huley", Selected = false, SelectedDate = DateTime.Parse("2003-09-01") },
            new UserModel { ID = 18, FullName = "Jack Goff", Selected = false, SelectedDate = DateTime.Parse("2005-09-01") },
            new UserModel { ID = 19, FullName = "Herculaño Hepres", Selected = false, SelectedDate = DateTime.Parse("2005-09-01") },
            new UserModel { ID = 20, FullName = "Ingannamorte Collates", Selected = false, SelectedDate = DateTime.Parse("2002-09-01") }
    );
        }
    }
}
