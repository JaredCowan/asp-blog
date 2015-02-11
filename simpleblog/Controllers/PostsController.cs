using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NHibernate.Linq;
using simpleblog.Infrastructure;
using simpleblog.Models;
using simpleblog.ViewModels;

namespace simpleblog.Controllers
{
    public class PostsController : Controller
    {
        private const int PostPerPage = 10;

        public ActionResult Index(int page = 1)
        {
            var baseQuery = Database.Session.Query<Post>().Where(t => t.DeletedAt == null).OrderByDescending(t => t.CreatedAt);

            var totalPostCount = baseQuery.Count();
            var postIds = baseQuery.Skip((page - 1)*PostPerPage).Take(PostPerPage).Select(t => t.Id).ToArray();
            var posts = baseQuery.Where(t => postIds.Contains(t.Id)).FetchMany(t => t.Tags).Fetch(t => t.User).ToList();

            return View(new PostsIndex
            {
                Posts = new PagedData<Post>(posts, totalPostCount, page, PostPerPage)
            });
        }
    }
}
