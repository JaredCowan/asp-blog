﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using simpleblog.Controllers;

namespace simpleblog
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            var namespaces = new[] { typeof(PostsController) };

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute("Login", "login", new { controller = "Auth", action = "Login" });

            routes.MapRoute("Home", "", new { controller = "Posts", action = "Index" });  
        }
    }
}
