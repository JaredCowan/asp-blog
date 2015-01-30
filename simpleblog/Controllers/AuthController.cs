using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
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
        }

        [HttpPost]
        public ActionResult Login(AuthLogin form)
        {
            if (!ModelState.IsValid)
                return View(form);

            if (form.Username != "rainbow dash")
            {
                ModelState.AddModelError("Username", "Invalid username or password.");
                return View(form);
            }

            return Content("The form is valid!");
        }
    }
}
