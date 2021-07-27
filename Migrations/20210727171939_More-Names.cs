using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace multiselect.Migrations
{
    public partial class MoreNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 2,
                column: "FullName",
                value: "Meredith Backpfeifengesicht");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 4,
                column: "FullName",
                value: "Gytis Peshka");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "ID", "FullName", "Selected", "SelectedDate" },
                values: new object[,]
                {
                    { 9, "Ivan Ivanov", false, new DateTime(2005, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 10, "Zhang Wei", false, new DateTime(2002, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 11, "Lei Ying Lo", false, new DateTime(2003, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 12, "Yu Stin Ki Pu", false, new DateTime(2002, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 13, "Ai Bang Mai Ni", false, new DateTime(2002, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 14, "Wai Fu Pi", false, new DateTime(2001, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 15, "Armpid Stiki", false, new DateTime(2003, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 16, "Madam Uke Kabore", false, new DateTime(2005, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 17, "Hank Huley", false, new DateTime(2003, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 18, "Jack Goff", false, new DateTime(2005, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 19, "Herculaño Hepres", false, new DateTime(2005, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 20, "Ingannamorte Collates", false, new DateTime(2002, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 20);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 2,
                column: "FullName",
                value: "Meredith Ivanova");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 4,
                column: "FullName",
                value: "Gytis Peskha");
        }
    }
}
