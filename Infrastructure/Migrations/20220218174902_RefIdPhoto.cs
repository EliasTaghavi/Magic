using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class RefIdPhoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppFiles_Users_UserId",
                table: "AppFiles");

            migrationBuilder.DropIndex(
                name: "IX_AppFiles_UserId",
                table: "AppFiles");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "AppFiles");

            migrationBuilder.AddColumn<string>(
                name: "RefId",
                table: "AppFiles",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RefId",
                table: "AppFiles");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "AppFiles",
                type: "nvarchar(450)",
                nullable: true);

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
    }
}
