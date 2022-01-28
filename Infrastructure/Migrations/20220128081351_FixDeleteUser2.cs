using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class FixDeleteUser2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppFiles_Users_UserId",
                table: "AppFiles");

            migrationBuilder.DropIndex(
                name: "IX_AppFiles_UserId",
                table: "AppFiles");

            migrationBuilder.CreateIndex(
                name: "IX_AppFiles_UserId",
                table: "AppFiles",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_AppFiles_Users_UserId",
                table: "AppFiles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppFiles_Users_UserId",
                table: "AppFiles");

            migrationBuilder.DropIndex(
                name: "IX_AppFiles_UserId",
                table: "AppFiles");

            migrationBuilder.CreateIndex(
                name: "IX_AppFiles_UserId",
                table: "AppFiles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppFiles_Users_UserId",
                table: "AppFiles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
