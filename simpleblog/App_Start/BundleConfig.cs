using System;
using System.Web.Optimization;

namespace simpleblog.App_Start
{
    public class BundleConfig
    {
        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList != null)
            {
                ignoreList.Ignore("*.intellisense.js");
                ignoreList.Ignore("*-vsdoc.js");
                ignoreList.Ignore("*.min.js");
                ignoreList.Ignore("*.min.css");
                ignoreList.Ignore("*.css.map");
            }
            else
            {
                throw new ArgumentNullException("ignoreList");
            }
        }

        public static void RegisterBundles(BundleCollection bundles)
        {
            // Switch some content to CDN path
            // bundles.UseCdn = true;
            // var jqueryCdnPath = "";

            // bundles.Add(new ScriptBundle("~/bundles/jquery", jqueryCdnPath)
            //    .Include("~/content/scripts/jquery-2.1.3.js"));

            bundles.Add(new StyleBundle("~/admin/styles")
                .Include("~/content/styles/depend/bootstrap.css")
                .Include("~/content/styles/dist/backend.css"));

            bundles.Add(new StyleBundle("~/styles")
                .Include("~/content/styles/depend/theme.css")
                .Include("~/content/styles/depend/bootstrap.css")
                .Include("~/content/styles/depend/font-awesome.css")
                .Include("~/content/styles/depend/fancybox/fancybox.css")
                .Include("~/content/styles/depend/style.css")
                .Include("~/content/styles/depend/style-responsive.css")
                .Include("~/content/styles/dist/frontend.css"));

            bundles.Add(new ScriptBundle("~/scripts")
                .Include("~/content/scripts/jquery-2.1.3.js")
                .Include("~/content/scripts/jquery.validate.js")
                .Include("~/content/scripts/jquery.validate.unobtrusive.js")
                .Include("~/content/scripts/bootstrap.js")
                .Include("~/content/scripts/nicescroll.js")
                .Include("~/content/scripts/scrollTo.js")
                .Include("~/content/scripts/fancybox.js")
                .Include("~/content/scripts/common-scripts.js"));

            bundles.Add(new ScriptBundle("~/admin/post/scripts")
                .Include("~/content/scripts/AdminPosts.js"));

            // Scripts need to be in Content folder or there's a permission error.
            bundles.Add(new ScriptBundle("~/admin/scripts")
                .Include("~/content/scripts/jquery-2.1.3.js")
                .Include("~/content/scripts/jquery.validate.js")
                .Include("~/content/scripts/jquery.validate.unobtrusive.js")
                .Include("~/content/scripts/bootstrap.js")
                .Include("~/content/scripts/Forms.js"));

            BundleTable.EnableOptimizations = true;
        }
    }
}
