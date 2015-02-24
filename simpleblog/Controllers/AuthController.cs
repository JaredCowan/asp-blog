using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using NHibernate.Linq;
using simpleblog.Models;
using simpleblog.ViewModels;

namespace simpleblog.Controllers
{
    public class AuthController : Controller
    {
        public ActionResult Login()
        {
            return View(new AuthLogin
            {
            });
        } // End Login

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToRoute("posts");
        } // End Logout

        [HttpPost]
        public ActionResult Login(AuthLogin form, string returnUrl)
        {

            Database.Session.Flush();
            var user = Database.Session.Query<User>().FirstOrDefault(u => u.Username == form.Username);
            if (user == null)
                simpleblog.Models.User.FakeHash();

            if (user == null || !user.CheckPassword(form.Password))
                ModelState.AddModelError("Username", "Username or password is incorrect");

            if (!ModelState.IsValid)
                return View(form);

            FormsAuthentication.SetAuthCookie(form.Username, true);

            if (!string.IsNullOrWhiteSpace(returnUrl))
                return Redirect(returnUrl);

            return RedirectToRoute("posts");
        } // End HttpPost Login
    } // End AuthController
} // End Namespace
