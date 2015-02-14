using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace simpleblog
{
    public static class UrlExtensions
    {
        public static Lazy<Settings> Configuration { get; set; }

        static UrlExtensions()
        {
            Configuration = new Lazy<Settings>(Settings.LoadCdn);
        }

        public static string VerdeCdn(this UrlHelper helper, string path)
        {
            var underlying = helper.Content(path);

            if (!Configuration.Value.Enabled)
            {
                return underlying;
            }

            var cloudRoot = HttpContext.Current.Request.Url.Scheme + "://" + Configuration.Value.VerdeCircleCdn;

            return underlying.StartsWith("/")
                ? cloudRoot + underlying
                : underlying.Replace(HttpContext.Current.Request.Url.Host, Configuration.Value.VerdeCircleCdn);
        }
    }
}
