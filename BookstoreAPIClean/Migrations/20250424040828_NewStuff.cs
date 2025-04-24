using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookstoreApiClean.Migrations
{
    /// <inheritdoc />
    public partial class NewStuff : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PointsUsed",
                table: "Transactions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
