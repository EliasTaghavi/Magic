using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddShopOffFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ObjectState",
                table: "ShopOff");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "ObjectState",
                table: "ShopOff",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);
        }
    }
}
