using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace simpleblog.Controllers
{
    public class ErrorsController : Controller
    {
        public ActionResult NotFound()
        {
            return View();
        } // End NotFound View

        public ActionResult Error()
        {
            return View();
        } // End Error View
    } // End ErrorsController
} // End Namespace
