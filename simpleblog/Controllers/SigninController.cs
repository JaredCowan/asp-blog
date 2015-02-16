using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using simpleblog.Infrastructure;

namespace simpleblog.Controllers
{
    [SelectedTab("signin")]
    public class SigninController : Controller
    {
        public ActionResult Index()
        {
            return View();
        } // End Index View
    } // End SigninController
} // End Namespace
