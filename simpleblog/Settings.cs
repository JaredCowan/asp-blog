using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace simpleblog
{
    public class Settings : ConfigurationSection
    {
        [ConfigurationProperty("enabled", DefaultValue = "false", IsRequired = true)]
        public bool Enabled
        {
            get { return (bool)this["enabled"]; }
            set { this["enabled"] = value; }
        }

        [ConfigurationProperty("verdeCircleCdn", DefaultValue = "", IsRequired = true)]
        public string VerdeCircleCdn
        {
            get { return (string)this["verdeCircleCdn"]; }
            set { this["verdeCircleCdn"] = value; }
        }

        public static string CdnSectionName { get { return "verdecdn"; } }

        public static Settings LoadCdn()
        {
            return (Settings)ConfigurationManager.GetSection(CdnSectionName);
        }
    }
}
