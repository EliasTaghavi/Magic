using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class PayDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "PayDate",
                table: "PackBuys",
                type: "datetime2",
                nullable: true);

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
                value: new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b72799ea-f2b8-4528-9387-2f1f339dcd1c",
                column: "CreatedDate",
                value: new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "f62ebb43-e65d-493d-965a-1c0bbf94b15f",
                column: "CreatedDate",
                value: new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PayDate",
                table: "PackBuys");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "3f7566d3-7a9e-4fdb-8267-eceba8cfb024",
                column: "CreatedDate",
                value: new DateTime(2022, 1, 5, 14, 4, 49, 872, DateTimeKind.Utc).AddTicks(9381));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "815cc1c6-de17-46e7-a3e5-f73dfc818da3",
                column: "CreatedDate",
                value: new DateTime(2022, 1, 5, 14, 4, 49, 872, DateTimeKind.Utc).AddTicks(9378));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b72799ea-f2b8-4528-9387-2f1f339dcd1c",
                column: "CreatedDate",
                value: new DateTime(2022, 1, 5, 14, 4, 49, 872, DateTimeKind.Utc).AddTicks(7997));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "f62ebb43-e65d-493d-965a-1c0bbf94b15f",
                column: "CreatedDate",
                value: new DateTime(2022, 1, 5, 14, 4, 49, 872, DateTimeKind.Utc).AddTicks(9374));
        }
    }
}
