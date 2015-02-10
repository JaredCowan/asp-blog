using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using simpleblog.Infrastructure;
using simpleblog.Models;

namespace simpleblog.Areas.Admin.ViewModels
{
    public class PostsIndex
    {
        public PagedData<Post> Posts { get; set; } 
    }
}
