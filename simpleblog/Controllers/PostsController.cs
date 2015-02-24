using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using NHibernate.Linq;
using simpleblog.Infrastructure;
using simpleblog.Models;
using simpleblog.ViewModels;

namespace simpleblog.Controllers
{
    [SelectedTab("blog")]
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
        } // End Index View

        public ActionResult Tag(string idAndSlug, int page = 1)
        {
            var parts = SeperateIdAndSlug(idAndSlug);
            if (parts == null)
                return HttpNotFound();

            var tag = Database.Session.Load<Tag>(parts.Item1);
            if (tag == null)
                return HttpNotFound();

            // SEO Optimization
            if (!tag.Slug.Equals(parts.Item2, StringComparison.CurrentCultureIgnoreCase))
                return RedirectToRoutePermanent("Tag", new { id = parts.Item1, slug = tag.Slug });

            var totalPostCount = tag.Posts.Count();

            var postIds = tag.Posts
                .OrderByDescending(g => g.CreatedAt)
                .Skip((page - 1) * PostPerPage)
                .Take(PostPerPage).Where(t => t.DeletedAt == null)
                .Select(t => t.Id)
                .ToArray();

            var posts = Database.Session.Query<Post>()
                .OrderByDescending(b => b.CreatedAt)
                .Where(t => postIds.Contains(t.Id))
                .FetchMany(f => f.Tags)
                .Fetch(f => f.User)
                .ToList();

            return View(new PostsTag
            {
                Tag = tag,
                Posts = new PagedData<Post>(posts, totalPostCount, page, PostPerPage)
            });

        } // End Tag

        public ActionResult Show(string idAndSlug, int page = 1)
        {
            var parts = SeperateIdAndSlug(idAndSlug);
            if (parts == null)
                return HttpNotFound();

            var post = Database.Session.Load<Post>(parts.Item1);
            if (post == null || post.IsDeleted)
                return HttpNotFound();

            // SEO Optimization
            if (!post.Slug.Equals(parts.Item2, StringComparison.CurrentCultureIgnoreCase))
                return RedirectToRoutePermanent("Post", new {id = parts.Item1, slug = post.Slug});

            return View(new PostsShow
            {
                Post = post
            });
        } // End Show View

        private System.Tuple<int, string> SeperateIdAndSlug(string idAndSlug)
        {
            var matches = Regex.Match(idAndSlug, @"^(\d+)\-(.*)?$");
            if (!matches.Success)
                return null;

            var id = int.Parse(matches.Result("$1"));
            var slug = matches.Result("$2");

            return Tuple.Create(id, slug);
        } // End Tuple
    } // End PostsController
} // End Namespace
