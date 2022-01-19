using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class AddShopRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "CreatedDate", "EnName", "Enable", "Name" },
                values: new object[] { "3843d9eb-4ada-457e-8b63-c7e69f1a9f59", new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230), "Shop", true, "کسب و کار" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "3843d9eb-4ada-457e-8b63-c7e69f1a9f59");
        }
    }
}
