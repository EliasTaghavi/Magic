using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Web.Migrations
{
    public partial class fixuserentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Phone",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhoneConfirmed",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "Mobile",
                table: "Users",
                type: "nvarchar(12)",
                maxLength: 12,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "3f7566d3-7a9e-4fdb-8267-eceba8cfb024",
                column: "CreatedDate",
                value: new DateTime(2021, 12, 31, 8, 59, 17, 843, DateTimeKind.Utc).AddTicks(3852));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "815cc1c6-de17-46e7-a3e5-f73dfc818da3",
                column: "CreatedDate",
                value: new DateTime(2021, 12, 31, 8, 59, 17, 843, DateTimeKind.Utc).AddTicks(3849));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b72799ea-f2b8-4528-9387-2f1f339dcd1c",
                column: "CreatedDate",
                value: new DateTime(2021, 12, 31, 8, 59, 17, 843, DateTimeKind.Utc).AddTicks(2461));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "f62ebb43-e65d-493d-965a-1c0bbf94b15f",
                column: "CreatedDate",
                value: new DateTime(2021, 12, 31, 8, 59, 17, 843, DateTimeKind.Utc).AddTicks(3844));

            migrationBuilder.CreateIndex(
                name: "IX_Users_Mobile",
                table: "Users",
                column: "Mobile",
                unique: true,
                filter: "[Mobile] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Mobile",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "Mobile",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(12)",
                oldMaxLength: 12,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Users",
                type: "nvarchar(12)",
                maxLength: 12,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PhoneConfirmed",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "3f7566d3-7a9e-4fdb-8267-eceba8cfb024",
                column: "CreatedDate",
                value: new DateTime(2021, 12, 26, 16, 29, 36, 657, DateTimeKind.Utc).AddTicks(5402));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "815cc1c6-de17-46e7-a3e5-f73dfc818da3",
                column: "CreatedDate",
                value: new DateTime(2021, 12, 26, 16, 29, 36, 657, DateTimeKind.Utc).AddTicks(5400));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "b72799ea-f2b8-4528-9387-2f1f339dcd1c",
                column: "CreatedDate",
                value: new DateTime(2021, 12, 26, 16, 29, 36, 657, DateTimeKind.Utc).AddTicks(4057));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: "f62ebb43-e65d-493d-965a-1c0bbf94b15f",
                column: "CreatedDate",
                value: new DateTime(2021, 12, 26, 16, 29, 36, 657, DateTimeKind.Utc).AddTicks(5395));

            migrationBuilder.CreateIndex(
                name: "IX_Users_Phone",
                table: "Users",
                column: "Phone",
                unique: true,
                filter: "[Phone] IS NOT NULL");
        }
    }
}
