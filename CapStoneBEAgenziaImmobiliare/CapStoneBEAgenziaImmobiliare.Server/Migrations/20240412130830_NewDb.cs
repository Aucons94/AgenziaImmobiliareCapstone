using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CapStoneBEAgenziaImmobiliare.Server.Migrations
{
    /// <inheritdoc />
    public partial class NewDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ruoli",
                columns: table => new
                {
                    IdRuolo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ruoli", x => x.IdRuolo);
                });

            migrationBuilder.CreateTable(
                name: "Staff",
                columns: table => new
                {
                    IdUser = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FkIdRuolo = table.Column<int>(type: "int", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cognome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telefono = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Foto = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cancellato = table.Column<bool>(type: "bit", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Staff", x => x.IdUser);
                    table.ForeignKey(
                        name: "FK_Staff_Ruoli_FkIdRuolo",
                        column: x => x.FkIdRuolo,
                        principalTable: "Ruoli",
                        principalColumn: "IdRuolo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Clienti",
                columns: table => new
                {
                    IdCliente = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FkIdUserCliente = table.Column<int>(type: "int", nullable: true),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cognome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telefono = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DettagliAggiuntivi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Attivo = table.Column<bool>(type: "bit", nullable: false),
                    Cancellato = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clienti", x => x.IdCliente);
                    table.ForeignKey(
                        name: "FK_Clienti_Staff_FkIdUserCliente",
                        column: x => x.FkIdUserCliente,
                        principalTable: "Staff",
                        principalColumn: "IdUser");
                });

            migrationBuilder.CreateTable(
                name: "Immobili",
                columns: table => new
                {
                    IdImmobile = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FkIdUser = table.Column<int>(type: "int", nullable: true),
                    Titolo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descrizione = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezzo = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TipoProprietà = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comune = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Indirizzo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CamereDaLetto = table.Column<int>(type: "int", nullable: false),
                    Bagni = table.Column<int>(type: "int", nullable: false),
                    Cucina = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sala = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AltriVani = table.Column<int>(type: "int", nullable: true),
                    Metratura = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Box = table.Column<int>(type: "int", nullable: true),
                    PostiAuto = table.Column<int>(type: "int", nullable: true),
                    CaratteristicheSpeciali = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Vetrina = table.Column<bool>(type: "bit", nullable: false),
                    Pubblicata = table.Column<bool>(type: "bit", nullable: false),
                    Cancellato = table.Column<bool>(type: "bit", nullable: false),
                    Locazione = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Immobili", x => x.IdImmobile);
                    table.ForeignKey(
                        name: "FK_Immobili_Staff_FkIdUser",
                        column: x => x.FkIdUser,
                        principalTable: "Staff",
                        principalColumn: "IdUser");
                });

            migrationBuilder.CreateTable(
                name: "Richieste",
                columns: table => new
                {
                    IdRichiesta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FkIdCliente = table.Column<int>(type: "int", nullable: false),
                    FkIdUser = table.Column<int>(type: "int", nullable: true),
                    CamereDaLetto = table.Column<int>(type: "int", nullable: false),
                    Bagni = table.Column<int>(type: "int", nullable: false),
                    Cucina = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sala = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Metratura = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Box = table.Column<int>(type: "int", nullable: true),
                    PostiAuto = table.Column<int>(type: "int", nullable: true),
                    Attivo = table.Column<bool>(type: "bit", nullable: false),
                    Cancellato = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Richieste", x => x.IdRichiesta);
                    table.ForeignKey(
                        name: "FK_Richieste_Clienti_FkIdCliente",
                        column: x => x.FkIdCliente,
                        principalTable: "Clienti",
                        principalColumn: "IdCliente",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Richieste_Staff_FkIdUser",
                        column: x => x.FkIdUser,
                        principalTable: "Staff",
                        principalColumn: "IdUser");
                });

            migrationBuilder.CreateTable(
                name: "RichiesteValutazione",
                columns: table => new
                {
                    IdValutazione = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FkIdCliente = table.Column<int>(type: "int", nullable: false),
                    FkIdUser = table.Column<int>(type: "int", nullable: true),
                    Indirizzo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CamereDaLetto = table.Column<int>(type: "int", nullable: false),
                    Bagni = table.Column<int>(type: "int", nullable: false),
                    Cucina = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sala = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AltriVani = table.Column<int>(type: "int", nullable: true),
                    Metratura = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Box = table.Column<int>(type: "int", nullable: true),
                    PostiAuto = table.Column<int>(type: "int", nullable: true),
                    CaratteristicheSpeciali = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Attivo = table.Column<bool>(type: "bit", nullable: false),
                    Cancellato = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RichiesteValutazione", x => x.IdValutazione);
                    table.ForeignKey(
                        name: "FK_RichiesteValutazione_Clienti_FkIdCliente",
                        column: x => x.FkIdCliente,
                        principalTable: "Clienti",
                        principalColumn: "IdCliente",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RichiesteValutazione_Staff_FkIdUser",
                        column: x => x.FkIdUser,
                        principalTable: "Staff",
                        principalColumn: "IdUser");
                });

            migrationBuilder.CreateTable(
                name: "ImmaginiCase",
                columns: table => new
                {
                    IdImmagine = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FkIdImmobile = table.Column<int>(type: "int", nullable: false),
                    Immagine = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DescrizioneImmagine = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImmagineCopertina = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImmaginiCase", x => x.IdImmagine);
                    table.ForeignKey(
                        name: "FK_ImmaginiCase_Immobili_FkIdImmobile",
                        column: x => x.FkIdImmobile,
                        principalTable: "Immobili",
                        principalColumn: "IdImmobile",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clienti_FkIdUserCliente",
                table: "Clienti",
                column: "FkIdUserCliente");

            migrationBuilder.CreateIndex(
                name: "IX_ImmaginiCase_FkIdImmobile",
                table: "ImmaginiCase",
                column: "FkIdImmobile");

            migrationBuilder.CreateIndex(
                name: "IX_Immobili_FkIdUser",
                table: "Immobili",
                column: "FkIdUser");

            migrationBuilder.CreateIndex(
                name: "IX_Richieste_FkIdCliente",
                table: "Richieste",
                column: "FkIdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_Richieste_FkIdUser",
                table: "Richieste",
                column: "FkIdUser");

            migrationBuilder.CreateIndex(
                name: "IX_RichiesteValutazione_FkIdCliente",
                table: "RichiesteValutazione",
                column: "FkIdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_RichiesteValutazione_FkIdUser",
                table: "RichiesteValutazione",
                column: "FkIdUser");

            migrationBuilder.CreateIndex(
                name: "IX_Staff_FkIdRuolo",
                table: "Staff",
                column: "FkIdRuolo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImmaginiCase");

            migrationBuilder.DropTable(
                name: "Richieste");

            migrationBuilder.DropTable(
                name: "RichiesteValutazione");

            migrationBuilder.DropTable(
                name: "Immobili");

            migrationBuilder.DropTable(
                name: "Clienti");

            migrationBuilder.DropTable(
                name: "Staff");

            migrationBuilder.DropTable(
                name: "Ruoli");
        }
    }
}
