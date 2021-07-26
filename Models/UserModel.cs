using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace multiselect.Models
{
    public class UserModel
    {
        [Key]
        public int ID { get; set; }
        public string FullName { get; set; }
        public bool Selected { get; set; }
        public DateTime SelectedDate { get; set; }
    }
}
