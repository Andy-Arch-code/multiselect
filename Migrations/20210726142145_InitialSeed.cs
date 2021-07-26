using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace multiselect.Migrations
{
    public partial class InitialSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "shared");

            migrationBuilder.CreateSequence<int>(
                name: "OrderNumbers",
                schema: "shared");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "ID", "FullName", "Selected", "SelectedDate" },
                values: new object[,]
                {
                    { 1, "Carson Li", false, new DateTime(2005, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, "Meredith Ivanova", false, new DateTime(2002, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, "Arturo Jopalov", false, new DateTime(2003, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 4, "Gytis Peskha", false, new DateTime(2002, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 5, "Yan Li", false, new DateTime(2002, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 6, "Peggy Poo", false, new DateTime(2001, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 7, "Laura Dee", false, new DateTime(2003, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 8, "Nina Nani", false, new DateTime(2005, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropSequence(
                name: "OrderNumbers",
                schema: "shared");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 8);
        }
    }
}
