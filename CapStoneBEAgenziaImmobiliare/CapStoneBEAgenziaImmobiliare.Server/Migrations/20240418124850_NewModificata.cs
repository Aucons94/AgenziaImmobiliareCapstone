using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CapStoneBEAgenziaImmobiliare.Server.Migrations
{
    /// <inheritdoc />
    public partial class NewModificata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DescrizioneImmagine",
                table: "ImmaginiCase");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DescrizioneImmagine",
                table: "ImmaginiCase",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
