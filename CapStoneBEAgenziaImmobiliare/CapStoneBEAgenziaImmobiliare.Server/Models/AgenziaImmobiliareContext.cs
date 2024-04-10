using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CapStoneBEAgenziaImmobiliare.Server.Models;

public partial class AgenziaImmobiliareContext : DbContext
{
    public AgenziaImmobiliareContext()
    {
    }

    public AgenziaImmobiliareContext(DbContextOptions<AgenziaImmobiliareContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Clienti> Clienti { get; set; }

    public virtual DbSet<ImmaginiCase> ImmaginiCase { get; set; }

    public virtual DbSet<Immobili> Immobili { get; set; }

    public virtual DbSet<Richieste> Richieste { get; set; }

    public virtual DbSet<RichiesteValutazione> RichiesteValutazione { get; set; }

    public virtual DbSet<Ruoli> Ruoli { get; set; }

    public virtual DbSet<Staff> Staff { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=DESKTOP-3M0OGT7\\SQLEXPRESS;Database=AgenziaImmobiliare;Trusted_Connection=True;Encrypt=false;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Clienti>(entity =>
        {
            entity.HasKey(e => e.IdClienti).HasName("PK__Clienti__D5946646F6A4524A");

            entity.ToTable("Clienti");

            entity.Property(e => e.IdClienti).ValueGeneratedNever();
            entity.Property(e => e.Cognome).HasMaxLength(120);
            entity.Property(e => e.Email).HasMaxLength(120);
            entity.Property(e => e.FkIdstaff).HasColumnName("Fk_IDStaff");
            entity.Property(e => e.Nome).HasMaxLength(120);
            entity.Property(e => e.Telefono).HasMaxLength(12);

            entity.HasOne(d => d.FkIdstaffNavigation).WithMany(p => p.Clienti)
                .HasForeignKey(d => d.FkIdstaff)
                .HasConstraintName("FK_Clienti_Staff");
        });

        modelBuilder.Entity<ImmaginiCase>(entity =>
        {
            entity.HasKey(e => e.IdImmagine).HasName("PK__Immagini__E9E5C3750EEE27B0");

            entity.ToTable("ImmaginiCase");

            entity.Property(e => e.IdImmagine).ValueGeneratedNever();
            entity.Property(e => e.FkIdImmobile).HasColumnName("Fk_IdImmobile");
            entity.Property(e => e.Immagine).HasMaxLength(255);

            entity.HasOne(d => d.FkIdImmobileNavigation).WithMany(p => p.ImmaginiCase)
                .HasForeignKey(d => d.FkIdImmobile)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ImmaginiCase_Immobili");
        });

        modelBuilder.Entity<Immobili>(entity =>
        {
            entity.HasKey(e => e.IdImmobile).HasName("PK__Immobili__017918F32F7196A1");

            entity.ToTable("Immobili");

            entity.Property(e => e.IdImmobile).ValueGeneratedNever();
            entity.Property(e => e.Comune).HasMaxLength(120);
            entity.Property(e => e.Cucina).HasMaxLength(60);
            entity.Property(e => e.FkIdStaff).HasColumnName("Fk_IdStaff");
            entity.Property(e => e.Indirizzo).HasMaxLength(120);
            entity.Property(e => e.Metratura).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Prezzo).HasColumnType("money");
            entity.Property(e => e.Sala).HasMaxLength(60);
            entity.Property(e => e.TipoProprietà).HasMaxLength(60);
            entity.Property(e => e.Titolo).HasMaxLength(120);

            entity.HasOne(d => d.FkIdStaffNavigation).WithMany(p => p.Immobili)
                .HasForeignKey(d => d.FkIdStaff)
                .HasConstraintName("FK_Immobili_Staff");
        });

        modelBuilder.Entity<Richieste>(entity =>
        {
            entity.HasKey(e => e.IdRichiesta).HasName("PK__Richiest__976944C99DF8F8E6");

            entity.ToTable("Richieste");

            entity.Property(e => e.IdRichiesta).ValueGeneratedNever();
            entity.Property(e => e.Cucina).HasMaxLength(60);
            entity.Property(e => e.FkIdCliente).HasColumnName("Fk_IdCliente");
            entity.Property(e => e.FkIdStaff).HasColumnName("Fk_IdStaff");
            entity.Property(e => e.Metratura).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Sala).HasMaxLength(60);

            entity.HasOne(d => d.FkIdClienteNavigation).WithMany(p => p.Richieste)
                .HasForeignKey(d => d.FkIdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Richieste_Clienti");

            entity.HasOne(d => d.FkIdStaffNavigation).WithMany(p => p.Richieste)
                .HasForeignKey(d => d.FkIdStaff)
                .HasConstraintName("FK_Richieste_Staff");
        });

        modelBuilder.Entity<RichiesteValutazione>(entity =>
        {
            entity.HasKey(e => e.IdValutazione).HasName("PK__Richiest__20F9C13527FF6C0A");

            entity.ToTable("RichiesteValutazione");

            entity.Property(e => e.IdValutazione)
                .ValueGeneratedNever()
                .HasColumnName("Id_Valutazione");
            entity.Property(e => e.Cucina).HasMaxLength(60);
            entity.Property(e => e.FkIdCliente).HasColumnName("Fk_Id_Cliente");
            entity.Property(e => e.FkIdStaff).HasColumnName("Fk_Id_Staff");
            entity.Property(e => e.Indirizzo).HasMaxLength(255);
            entity.Property(e => e.Metratura).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Sala).HasMaxLength(60);

            entity.HasOne(d => d.FkIdClienteNavigation).WithMany(p => p.RichiesteValutazione)
                .HasForeignKey(d => d.FkIdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RichiesteValutazione_Clienti");

            entity.HasOne(d => d.FkIdStaffNavigation).WithMany(p => p.RichiesteValutazione)
                .HasForeignKey(d => d.FkIdStaff)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_RichiesteValutazione_Staff");
        });

        modelBuilder.Entity<Ruoli>(entity =>
        {
            entity.HasKey(e => e.IdRuolo).HasName("PK__Ruoli__5F37071DAD5C8F30");

            entity.ToTable("Ruoli");

            entity.Property(e => e.IdRuolo).ValueGeneratedNever();
            entity.Property(e => e.Ruolo).HasMaxLength(100);
        });

        modelBuilder.Entity<Staff>(entity =>
        {
            entity.HasKey(e => e.IdStaff).HasName("PK__Staff__2E1BC48352EAE32F");

            entity.Property(e => e.IdStaff).ValueGeneratedNever();
            entity.Property(e => e.Cognome).HasMaxLength(60);
            entity.Property(e => e.FkIdRuolo).HasColumnName("Fk_IdRuolo");
            entity.Property(e => e.Nome).HasMaxLength(60);
            entity.Property(e => e.Telefono).HasMaxLength(12);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
