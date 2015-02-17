using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace simpleblog.ViewModels
{
    public class SidebarTag
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Slug { get; private set; }
        public int PostCount { get; private set; }

        public SidebarTag(int id, string name, string slug, int postCount)
        {
            Name = name;
            Id = id;
            Slug = slug;
            PostCount = postCount;
        } // End property SidebarTag
    } // End SidebarTag

    public class LayoutSidebar
    {
        public bool IsLoggedIn { get; set; }
        public string Username { get; set; }
        public bool IsAdmin { get; set; }
        public IEnumerable<SidebarTag> Tags { get; set; } 
    } // End LayoutSidebar

    public class LayoutNavbar
    {
        public bool IsLoggedIn { get; set; }
        public string Username { get; set; }
        public bool IsAdmin { get; set; }
        public IEnumerable<SidebarTag> Tags { get; set; }
    } // End LayoutNavbar

    public class LayoutHomebar
    {
        public bool IsLoggedIn { get; set; }
        public string Username { get; set; }
        public bool IsAdmin { get; set; }
    } // End LayoutHomebar
} //End Namespace
