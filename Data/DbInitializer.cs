using System;
using multiselect.Models;
using System.Linq;

namespace multiselect.Data
{
    public class DbInitializer
    {
        public static void Initialize(MultiselectContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            var students = new UserModel[]
            {
            new UserModel{FullName="Carson Li",Selected=false,SelectedDate=DateTime.Parse("2005-09-01")},
            new UserModel{FullName="Meredith Ivanova",Selected=false,SelectedDate=DateTime.Parse("2002-09-01")},
            new UserModel{FullName="Arturo Jopalov",Selected=false,SelectedDate=DateTime.Parse("2003-09-01")},
            new UserModel{FullName="Gytis Peskha",Selected=false,SelectedDate=DateTime.Parse("2002-09-01")},
            new UserModel{FullName="Yan Li",Selected=false,SelectedDate=DateTime.Parse("2002-09-01")},
            new UserModel{FullName="Peggy Poo",Selected=false,SelectedDate=DateTime.Parse("2001-09-01")},
            new UserModel{FullName="Laura Dee",Selected=false,SelectedDate=DateTime.Parse("2003-09-01")},
            new UserModel{FullName="Nina Nani",Selected=false,SelectedDate=DateTime.Parse("2005-09-01")}
            };
            foreach (UserModel s in students)
            {
                context.Users.Add(s);
            }
            context.SaveChanges();
        }
    }
}
