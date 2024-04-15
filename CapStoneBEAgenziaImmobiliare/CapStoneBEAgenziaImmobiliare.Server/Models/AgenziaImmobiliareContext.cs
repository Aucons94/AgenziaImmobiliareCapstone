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

    public virtual DbSet<Cliente> Clienti { get; set; }

    public virtual DbSet<ImmagineCasa> ImmaginiCase { get; set; }

    public virtual DbSet<Immobile> Immobili { get; set; }

    public virtual DbSet<Richiesta> Richieste { get; set; }

    public virtual DbSet<RichiestaValutazione> RichiesteValutazione { get; set; }

    public virtual DbSet<Ruolo> Ruoli { get; set; }

    public virtual DbSet<User> Staff { get; set; }


}
