using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NHibernate.Dialect.Schema;
using NHibernate.Linq;
using simpleblog.Areas.Admin.ViewModels;
using simpleblog.Infrastructure;
using simpleblog.Models;

namespace simpleblog.Areas.Admin.Controllers
{
    [Authorize(Roles = "admin")]
    [SelectedTab("users")]
    public class UsersController : Controller
    {
        public ActionResult Index()
        {
            return View(new UsersIndex
            {
                Users = Database.Session.Query<User>().ToList()
            });
        }

        public ActionResult New()
        {
            return View(new UsersNew
            {
                
            });
        }

        [HttpPost]
        public ActionResult New(UsersNew form)
        {
            if (Database.Session.Query<User>().Any(u => u.Username == form.Username))
                ModelState.AddModelError("Username", "Username must be unique");

            if (Database.Session.Query<User>().Any(e => e.Email == form.Email))
                ModelState.AddModelError("Email", "Email must be unique");

            if (!ModelState.IsValid)
                return View(form);

            var user = new User
            {
                Email = form.Email,
                Username = form.Username
            };

            user.SetPassword(form.Password);

            Database.Session.Save(user);

            return RedirectToAction("index");
        }

        public ActionResult Edit(int id)
        {
            var user = Database.Session.Load<User>(id);
            if (user == null)
                return HttpNotFound();

            return View(new UsersEdit
            {
                Username = user.Username,
                Email = user.Email
            });
        }

        [HttpPost]
        public ActionResult Edit(int id, UsersEdit form)
        {
            var user = Database.Session.Load<User>(id);
            if (user == null)
                return HttpNotFound();

            if (Database.Session.Query<User>().Any(u => u.Username == form.Username && u.Id != id))
                ModelState.AddModelError("Username", "Username must be unique.");

            if (!ModelState.IsValid)
                return View(form);

            user.Username = form.Username;
            user.Email = form.Email;
            Database.Session.Flush();
            Database.Session.Update(user);

            return RedirectToAction("index");
        }
    }
}
