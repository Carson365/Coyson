using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookstoreApiClean.Migrations
{
    /// <inheritdoc />
    public partial class AdjustTokenLength : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Customers");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Customers",
                newName: "ProfileImageUrl");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Customers",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "CustID",
                table: "Customers",
                newName: "Id");

            migrationBuilder.AddColumn<bool>(
                name: "hasCheckedOut",
                table: "Transactions",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "Customers",
                type: "varchar(1024)",
                maxLength: 1024,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "hasCheckedOut",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "Token",
                table: "Customers");

            migrationBuilder.RenameColumn(
                name: "ProfileImageUrl",
                table: "Customers",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Customers",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Customers",
                newName: "CustID");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Customers",
                type: "longtext",
                nullable: false);
        }
    }
}
