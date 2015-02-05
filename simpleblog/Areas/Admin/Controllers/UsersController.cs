using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
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
    }
}
