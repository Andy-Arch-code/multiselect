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
        public bool Select(int Id, MultiselectContext multiselectContext)
        {
            try
            {
                using (multiselectContext)
                {
                    multiselectContext.Users.FirstOrDefault(x => x.ID == Id).Selected = true;
                    multiselectContext.Users.FirstOrDefault(x => x.ID == Id).SelectedDate = DateTime.Now;
                    multiselectContext.SaveChanges();

                    if (multiselectContext.Users.FirstOrDefault(x => x.ID == Id).Selected == true)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception("Couldn't connect to database", e);
            }
        }

        public bool Deselect(int Id, MultiselectContext multiselectContext)
        {
            try
            {
                using (multiselectContext)
                {
                    multiselectContext.Users.First(x => x.ID == Id).Selected = false;
                    multiselectContext.SaveChanges();

                    if (multiselectContext.Users.FirstOrDefault(x => x.ID == Id).Selected == false)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
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
