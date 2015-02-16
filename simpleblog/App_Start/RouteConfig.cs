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
            var namespaces = new[] { typeof(PostsController).Namespace };

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // Index Page
            routes.MapRoute("Home", "", new { controller = "Home", action = "Index" }, namespaces);

            // Hack for .NET routing engine not liking int and char in url not seperated by a slash
            //
            routes.MapRoute("TagForRealThisTime", "tag/{idAndSlug}", new {controller = "Posts", action = "Tag"}, namespaces);
            routes.MapRoute("Tag", "tag/{id}-{slug}", new {controller = "Posts", action = "Tag"}, namespaces);

            // Hack for .NET routing engine not liking int and char in url not seperated by a slash
            // 
            routes.MapRoute("PostForRealThisTime", "post/{idAndSlug}", new{controller = "Posts", action = "Show"}, namespaces);

            routes.MapRoute("Post", "post/{id}-{slug}", new {controller = "Posts", action = "Show"}, namespaces);

            routes.MapRoute("Login", "login", new { controller = "Auth", action = "Login" }, namespaces);

            routes.MapRoute("Logout", "logout", new { controller = "Auth", action = "Logout" }, namespaces);

            routes.MapRoute("Contact", "Contact", new { controller = "Contact", action = "Index" }, namespaces);

            routes.MapRoute("Price", "Pricing", new { controller = "Price", action = "Index" }, namespaces);

            routes.MapRoute("Signin", "Sign-In", new { controller = "Signin", action = "Index" }, namespaces);

            routes.MapRoute("Signup", "Sign-up", new { controller = "Signup", action = "Index" }, namespaces);

            routes.MapRoute("Posts", "Blog", new { controller = "Posts", action = "Index" }, namespaces);

            routes.MapRoute("Sidebar", "", new {controller = "Layout", action = "Sidebar"}, namespaces);

            // routes.MapRoute("Error404", "errors/404", new {controller = "Errors", action = "NotFound"}, namespaces);

            // routes.MapRoute("Error500", "errors/500", new { controller = "Errors", action = "Error" }, namespaces);
        }
    }
}
