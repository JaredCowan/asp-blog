using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using simpleblog.Models;

namespace simpleblog.Areas.Admin.ViewModels
{
    public class UsersIndex
    {
        public IEnumerable<User> Users { get; set; } 
    }
}