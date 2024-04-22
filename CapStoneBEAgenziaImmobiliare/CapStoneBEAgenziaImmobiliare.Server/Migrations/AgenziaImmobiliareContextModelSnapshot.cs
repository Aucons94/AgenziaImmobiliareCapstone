﻿// <auto-generated />
using System;
using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CapStoneBEAgenziaImmobiliare.Server.Migrations
{
    [DbContext(typeof(AgenziaImmobiliareContext))]
    partial class AgenziaImmobiliareContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.Cliente", b =>
                {
                    b.Property<int>("IdCliente")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdCliente"));

                    b.Property<bool>("Attivo")
                        .HasColumnType("bit");

                    b.Property<bool>("Cancellato")
                        .HasColumnType("bit");

                    b.Property<string>("Cognome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DettagliAggiuntivi")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("FkIdUserCliente")
                        .HasColumnType("int");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefono")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdCliente");

                    b.HasIndex("FkIdUserCliente");

                    b.ToTable("Clienti", (string)null);
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.ImmagineCasa", b =>
                {
                    b.Property<int>("IdImmagine")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdImmagine"));

                    b.Property<int>("FkIdImmobile")
                        .HasColumnType("int");

                    b.Property<string>("Immagine")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("ImmagineCopertina")
                        .HasColumnType("bit");

                    b.HasKey("IdImmagine");

                    b.HasIndex("FkIdImmobile");

                    b.ToTable("ImmaginiCase", (string)null);
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.Immobile", b =>
                {
                    b.Property<int>("IdImmobile")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdImmobile"));

                    b.Property<int?>("AltriVani")
                        .HasColumnType("int");

                    b.Property<int>("Bagni")
                        .HasColumnType("int");

                    b.Property<int?>("Box")
                        .HasColumnType("int");

                    b.Property<int>("CamereDaLetto")
                        .HasColumnType("int");

                    b.Property<bool>("Cancellato")
                        .HasColumnType("bit");

                    b.Property<string>("CaratteristicheSpeciali")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Comune")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Cucina")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Descrizione")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("FkIdUser")
                        .HasColumnType("int");

                    b.Property<string>("Indirizzo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Locazione")
                        .HasColumnType("bit");

                    b.Property<decimal>("Metratura")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("PostiAuto")
                        .HasColumnType("int");

                    b.Property<decimal>("Prezzo")
                        .HasColumnType("decimal(18,2)");

                    b.Property<bool>("Pubblicata")
                        .HasColumnType("bit");

                    b.Property<string>("Sala")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TipoProprietà")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Titolo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Vetrina")
                        .HasColumnType("bit");

                    b.HasKey("IdImmobile");

                    b.HasIndex("FkIdUser");

                    b.ToTable("Immobili", (string)null);
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.Richiesta", b =>
                {
                    b.Property<int>("IdRichiesta")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdRichiesta"));

                    b.Property<bool>("Attivo")
                        .HasColumnType("bit");

                    b.Property<int>("Bagni")
                        .HasColumnType("int");

                    b.Property<int?>("Box")
                        .HasColumnType("int");

                    b.Property<int>("CamereDaLetto")
                        .HasColumnType("int");

                    b.Property<bool>("Cancellato")
                        .HasColumnType("bit");

                    b.Property<string>("Cucina")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FkIdCliente")
                        .HasColumnType("int");

                    b.Property<int?>("FkIdUser")
                        .HasColumnType("int");

                    b.Property<decimal>("Metratura")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("PostiAuto")
                        .HasColumnType("int");

                    b.Property<string>("Sala")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdRichiesta");

                    b.HasIndex("FkIdCliente");

                    b.HasIndex("FkIdUser");

                    b.ToTable("Richieste", (string)null);
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.RichiestaValutazione", b =>
                {
                    b.Property<int>("IdValutazione")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdValutazione"));

                    b.Property<int?>("AltriVani")
                        .HasColumnType("int");

                    b.Property<bool>("Attivo")
                        .HasColumnType("bit");

                    b.Property<int>("Bagni")
                        .HasColumnType("int");

                    b.Property<int?>("Box")
                        .HasColumnType("int");

                    b.Property<int>("CamereDaLetto")
                        .HasColumnType("int");

                    b.Property<bool>("Cancellato")
                        .HasColumnType("bit");

                    b.Property<string>("CaratteristicheSpeciali")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Cucina")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FkIdCliente")
                        .HasColumnType("int");

                    b.Property<int?>("FkIdUser")
                        .HasColumnType("int");

                    b.Property<string>("Indirizzo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Metratura")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("PostiAuto")
                        .HasColumnType("int");

                    b.Property<string>("Sala")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdValutazione");

                    b.HasIndex("FkIdCliente");

                    b.HasIndex("FkIdUser");

                    b.ToTable("RichiesteValutazione", (string)null);
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.Ruolo", b =>
                {
                    b.Property<int>("IdRuolo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdRuolo"));

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdRuolo");

                    b.ToTable("Ruoli", (string)null);
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.User", b =>
                {
                    b.Property<int>("IdUser")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdUser"));

                    b.Property<bool>("Cancellato")
                        .HasColumnType("bit");

                    b.Property<string>("Cognome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FkIdRuolo")
                        .HasColumnType("int");

                    b.Property<string>("Foto")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefono")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdUser");

                    b.HasIndex("FkIdRuolo");

                    b.ToTable("Staff", (string)null);
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.Cliente", b =>
                {
                    b.HasOne("CapStoneBEAgenziaImmobiliare.Server.Models.User", "User")
                        .WithMany("Clienti")
                        .HasForeignKey("FkIdUserCliente");

                    b.Navigation("User");
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.ImmagineCasa", b =>
                {
                    b.HasOne("CapStoneBEAgenziaImmobiliare.Server.Models.Immobile", "Immobile")
                        .WithMany("ImmagineCasa")
                        .HasForeignKey("FkIdImmobile")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Immobile");
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.Immobile", b =>
                {
                    b.HasOne("CapStoneBEAgenziaImmobiliare.Server.Models.User", "User")
                        .WithMany("Immobili")
                        .HasForeignKey("FkIdUser");

                    b.Navigation("User");
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.Richiesta", b =>
                {
                    b.HasOne("CapStoneBEAgenziaImmobiliare.Server.Models.Cliente", "Cliente")
                        .WithMany("Richieste")
                        .HasForeignKey("FkIdCliente")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CapStoneBEAgenziaImmobiliare.Server.Models.User", "User")
                        .WithMany("Richieste")
                        .HasForeignKey("FkIdUser");

                    b.Navigation("Cliente");

                    b.Navigation("User");
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.RichiestaValutazione", b =>
                {
                    b.HasOne("CapStoneBEAgenziaImmobiliare.Server.Models.Cliente", "Cliente")
                        .WithMany("RichiesteValutazione")
                        .HasForeignKey("FkIdCliente")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CapStoneBEAgenziaImmobiliare.Server.Models.User", "User")
                        .WithMany("RichiesteValutazione")
                        .HasForeignKey("FkIdUser");

                    b.Navigation("Cliente");

                    b.Navigation("User");
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.User", b =>
                {
                    b.HasOne("CapStoneBEAgenziaImmobiliare.Server.Models.Ruolo", "Ruolo")
                        .WithMany()
                        .HasForeignKey("FkIdRuolo")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ruolo");
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.Cliente", b =>
                {
                    b.Navigation("Richieste");

                    b.Navigation("RichiesteValutazione");
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.Immobile", b =>
                {
                    b.Navigation("ImmagineCasa");
                });

            modelBuilder.Entity("CapStoneBEAgenziaImmobiliare.Server.Models.User", b =>
                {
                    b.Navigation("Clienti");

                    b.Navigation("Immobili");

                    b.Navigation("Richieste");

                    b.Navigation("RichiesteValutazione");
                });
#pragma warning restore 612, 618
        }
    }
}
