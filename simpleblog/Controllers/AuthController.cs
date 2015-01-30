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
                Test = "This is my test value set."
            });
        }

        [HttpPost]
        public ActionResult Login(AuthLogin form)
        {
            form.Test = "This is the new form value.";
            return View(form);
        }
    }
}
