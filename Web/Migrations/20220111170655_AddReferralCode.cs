using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddReferralCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ReferralCode",
                table: "Shops",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Shops_ReferralCode",
                table: "Shops",
                column: "ReferralCode",
                unique: true,
                filter: "[ReferralCode] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Shops_ReferralCode",
                table: "Shops");

            migrationBuilder.DropColumn(
                name: "ReferralCode",
                table: "Shops");
        }
    }
}
