using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NHibernate.Cfg;
using NHibernate.Mapping.ByCode;
using simpleblog.Models;

namespace simpleblog
{
    public static class Database
    {
        public static void Configure()
        {
            var config = new Configuration();

            // Configure connection string
            config.Configure();

            // Add our mappings
            var mapper = new ModelMapper();
            mapper.AddMapping<UserMap>();

            config.AddMapping(mapper.CompileMappingForAllExplicitlyAddedEntities());

            // Create session factory

        }

        public static void OpenSession()
        {
        }

        public static void CloseSession()
        {
        }
    }
}