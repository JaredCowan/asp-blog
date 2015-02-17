using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using simpleblog.Infrastructure;
using simpleblog.Models;

namespace simpleblog.ViewModels
{
    public class PostsIndex
    {
        public PagedData<Post> Posts { get; set; }
    } // PostsIndex

    public class PostsShow
    {
        public Post Post { get; set; }
    } // End PostsShow

    public class PostsTag
    {
        public Tag Tag { get; set; }
        public PagedData<Post> Posts { get; set; }
    } // End PostsTag
} // End namespaces
