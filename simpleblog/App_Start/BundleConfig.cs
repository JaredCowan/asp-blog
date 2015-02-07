using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace simpleblog.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/admin/styles")
                .Include("~/content/styles/bootstrap.css")
                .Include("~/content/styles/admin.css"));

            bundles.Add(new StyleBundle("~/styles")
                .Include("~/content/styles/bootstrap.css")
                .Include("~/content/styles/site.css"));

            bundles.Add(new ScriptBundle("~/scripts")
                .Include("~/content/scripts/jquery-2.1.3.js")
                .Include("~/content/scripts/jquery.validate.js")
                .Include("~/content/scripts/jquery.validate.unobtrusive.js")
                .Include("~/content/scripts/bootstrap.js"));

            // Scripts need to be in Content folder or there's a permission error.
            bundles.Add(new ScriptBundle("~/admin/scripts")
                .Include("~/content/scripts/jquery-2.1.3.js")
                .Include("~/content/scripts/jquery.validate.js")
                .Include("~/content/scripts/jquery.validate.unobtrusive.js")
                .Include("~/content/scripts/bootstrap.js")
                .Include("~/content/scripts/Forms.js"));
        }
    }
}
