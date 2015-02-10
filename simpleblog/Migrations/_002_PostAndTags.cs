using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.WebPages;
using FluentMigrator;

namespace simpleblog.Migrations
{
    [Migration(2)]
    public class _002_PostAndTags : Migration
    {
        public override void Up()
        {
            Create.Table("posts")
                .WithColumn("id").AsInt32().PrimaryKey().Identity()
                .WithColumn("user_id").AsInt32().ForeignKey("users", "id")
                .WithColumn("title").AsString(128)
                .WithColumn("slug").AsString(128)
                .WithColumn("created_at").AsDateTime()
                .WithColumn("updated_at").AsDateTime().Nullable()
                .WithColumn("deleted_at").AsDateTime().Nullable();

            Create.Table("tags")
                .WithColumn("id").AsInt32().PrimaryKey().Identity()
                .WithColumn("slug").AsString(128)
                .WithColumn("name").AsString(128);

            Create.Table("post_tags")
                .WithColumn("tag_id").AsInt32().ForeignKey("tags", "id").OnDelete(Rule.Cascade)
                .WithColumn("post_id").AsInt32().ForeignKey("posts", "id").OnDelete(Rule.Cascade);
        }

        public override void Down()
        {
            Delete.Table("post_tags");
            Delete.Table("posts");
            Delete.Table("tags");
        }
    }
}
