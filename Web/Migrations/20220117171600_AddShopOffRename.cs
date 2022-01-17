using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddShopOffRename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShopOff_Shops_ShopId",
                table: "ShopOff");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ShopOff",
                table: "ShopOff");

            migrationBuilder.RenameTable(
                name: "ShopOff",
                newName: "ShopOffs");

            migrationBuilder.RenameIndex(
                name: "IX_ShopOff_ShopId",
                table: "ShopOffs",
                newName: "IX_ShopOffs_ShopId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ShopOffs",
                table: "ShopOffs",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopOffs_Shops_ShopId",
                table: "ShopOffs",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShopOffs_Shops_ShopId",
                table: "ShopOffs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ShopOffs",
                table: "ShopOffs");

            migrationBuilder.RenameTable(
                name: "ShopOffs",
                newName: "ShopOff");

            migrationBuilder.RenameIndex(
                name: "IX_ShopOffs_ShopId",
                table: "ShopOff",
                newName: "IX_ShopOff_ShopId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ShopOff",
                table: "ShopOff",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopOff_Shops_ShopId",
                table: "ShopOff",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
