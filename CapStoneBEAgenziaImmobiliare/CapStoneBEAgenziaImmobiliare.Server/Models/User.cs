using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CapStoneBEAgenziaImmobiliare.Server.Models;

public partial class User
{
    [Key]
    public int IdUser { get; set; }

    [ForeignKey("Ruolo")]
    public int FkIdRuolo { get; set; }

    public string Nome { get; set; } = null!;

    public string Cognome { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public string? Foto { get; set; }

    public bool Cancellato { get; set; }
    
    public string Password { get; set; }

    public virtual ICollection<Cliente> Clienti { get; set; }

    public virtual ICollection<Immobile> Immobili { get; set; }

    public virtual ICollection<RichiestaValutazione> RichiesteValutazione { get; set; }

    public virtual ICollection<Richiesta> Richieste { get; set; }

    public Ruolo Ruolo { get; set; }

} 
