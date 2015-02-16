using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using simpleblog.Infrastructure;

namespace simpleblog.Controllers
{
    [SelectedTab("signup")]
    public class SignupController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
