using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Web.Migrations
{
    public partial class AddPackBuy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PackBuys",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PackId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TrackingNumber = table.Column<long>(type: "bigint", nullable: false),
                    GatewayName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    PayStatus = table.Column<bool>(type: "bit", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Enable = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PackBuys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PackBuys_Packs_PackId",
                        column: x => x.PackId,
                        principalTable: "Packs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PackBuys_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_PackBuys_PackId",
                table: "PackBuys",
                column: "PackId");

            migrationBuilder.CreateIndex(
                name: "IX_PackBuys_TrackingNumber_GatewayName",
                table: "PackBuys",
                columns: new[] { "TrackingNumber", "GatewayName" },
                unique: true,
                filter: "[GatewayName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_PackBuys_UserId",
                table: "PackBuys",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PackBuys");

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
    }
}
