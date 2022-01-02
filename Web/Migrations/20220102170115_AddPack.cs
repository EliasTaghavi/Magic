using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class AddPack : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Packs",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DayCount = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Enable = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Packs", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "3f7566d3-7a9e-4fdb-8267-eceba8cfb024",
                column: "CreatedDate",
                value: new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "815cc1c6-de17-46e7-a3e5-f73dfc818da3",
                column: "CreatedDate",
                value: new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2227));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b72799ea-f2b8-4528-9387-2f1f339dcd1c",
                column: "CreatedDate",
                value: new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(756));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "f62ebb43-e65d-493d-965a-1c0bbf94b15f",
                column: "CreatedDate",
                value: new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2223));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Packs");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "3f7566d3-7a9e-4fdb-8267-eceba8cfb024",
                column: "CreatedDate",
                value: new DateTime(2021, 12, 31, 19, 36, 33, 42, DateTimeKind.Utc).AddTicks(7969));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "815cc1c6-de17-46e7-a3e5-f73dfc818da3",
                column: "CreatedDate",
                value: new DateTime(2021, 12, 31, 19, 36, 33, 42, DateTimeKind.Utc).AddTicks(7966));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b72799ea-f2b8-4528-9387-2f1f339dcd1c",
                column: "CreatedDate",
                value: new DateTime(2021, 12, 31, 19, 36, 33, 42, DateTimeKind.Utc).AddTicks(6454));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "f62ebb43-e65d-493d-965a-1c0bbf94b15f",
                column: "CreatedDate",
                value: new DateTime(2021, 12, 31, 19, 36, 33, 42, DateTimeKind.Utc).AddTicks(7962));
        }
    }
}
