using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NHibernate.Linq;
using simpleblog.Models;
using simpleblog.ViewModels;
using simpleblog.Infrastructure;

namespace simpleblog.Controllers
{
    public class LayoutController : Controller
    {
        [ChildActionOnly]
        public ActionResult Sidebar()
        {
            return View(new LayoutSidebar
            {
                IsLoggedIn = Auth.User != null,
                Username = Auth.User != null ? Auth.User.Username : "",
                IsAdmin = User.IsInRole("admin"),
                Tags = Database.Session.Query<Tag>().Select(tag => new
                {
                  tag.Id,
                  tag.Name,
                  tag.Slug,
                  PostCount = tag.Posts.Count
                }).Where(t => t.PostCount > 0).OrderByDescending(p => p.PostCount).Select(
                tag => new SidebarTag(tag.Id, tag.Name, tag.Slug, tag.PostCount)).ToList()
            });
        } // End Sidebar View

        [ChildActionOnly]
        public ActionResult Navbar()
        {
            return View(new LayoutNavbar
            {
                IsLoggedIn = Auth.User != null,
                Username = Auth.User != null ? Auth.User.Username : "",
                IsAdmin = User.IsInRole("admin"),
                Tags = Database.Session.Query<Tag>().Select(tag => new
                {
                    tag.Id,
                    tag.Name,
                    tag.Slug,
                    PostCount = tag.Posts.Count
                }).Where(t => t.PostCount > 0).OrderByDescending(p => p.PostCount).Select(
                tag => new SidebarTag(tag.Id, tag.Name, tag.Slug, tag.PostCount)).ToList()
            });
        } // End Navbar View

        [ChildActionOnly]
        public ActionResult Homebar()
        {
            return View(new LayoutHomebar
            {
                IsLoggedIn = Auth.User != null,
                Username = Auth.User != null ? Auth.User.Username : "",
                IsAdmin = User.IsInRole("admin")
            });
        } // End Homebar View
    } // End LayoutController
} // End Namespace
