using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class FixDeleteShopOffs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShopOffs_Shops_ShopId",
                table: "ShopOffs");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopOffs_Shops_ShopId",
                table: "ShopOffs",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShopOffs_Shops_ShopId",
                table: "ShopOffs");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopOffs_Shops_ShopId",
                table: "ShopOffs",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id");
        }
    }
}
