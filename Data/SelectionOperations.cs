using Microsoft.EntityFrameworkCore;
using multiselect.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace multiselect.Data
{
    public class SelectionOperations
    {
        public void Select(int Id, MultiselectContext multiselectContext)
        {
            try
            {
                using (multiselectContext)
                {
                    multiselectContext.Users.FirstOrDefault(x => x.ID == Id).Selected = true;
                    multiselectContext.Users.FirstOrDefault(x => x.ID == Id).SelectedDate = DateTime.Now;
                    multiselectContext.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception("Couldn't connect to database", e);
            }
        }

        public void Deselect(int Id, MultiselectContext multiselectContext)
        {
            try
            {
                using (multiselectContext)
                {
                    multiselectContext.Users.First(x => x.ID == Id).Selected = false;
                    multiselectContext.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception("Couldn't connect to database", e);
            }
        }

        public void SelectAll(MultiselectContext multiselectContext)
        {
            try
            {
                using (multiselectContext)
                {
                    foreach (var user in multiselectContext.Users)
                    {
                        user.Selected = true;
                        user.SelectedDate = DateTime.Now;
                    }
                    multiselectContext.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception("Couldn't connect to database", e);
            }
        }

        public void DeselectAll(MultiselectContext multiselectContext)
        {
            try
            {
                using (multiselectContext)
                {
                    foreach (var user in multiselectContext.Users)
                    {
                        user.Selected = false;
                    }
                    multiselectContext.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception("Couldn't connect to database", e);
            }
        }

        public List<UserModel> getAllUsers(MultiselectContext multiselectContext)
        {
            try
            {
                using (multiselectContext)
                {
                    return multiselectContext.Users.ToList();
                }
            }
            catch (Exception e)
            {
                throw new Exception("Couldn't connect to database", e);
            }
        }
    }
}
