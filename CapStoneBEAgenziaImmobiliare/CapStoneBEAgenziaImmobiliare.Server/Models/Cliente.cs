using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CapStoneBEAgenziaImmobiliare.Server.Models;

public partial class Cliente
{
    [Key]
    public int IdCliente { get; set; }

    [ForeignKey ("User")]    
    public int? FkIdUserCliente { get; set; }

    public virtual User User { get; set; }

    public string Nome { get; set; } = null!;

    public string Cognome { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public string? DettagliAggiuntivi { get; set; }

    public bool Attivo { get; set; }

    public bool Cancellato { get; set; }

    public virtual ICollection<RichiestaValutazione> RichiesteValutazione { get; set; }

    public virtual ICollection<Richiesta> Richieste { get; set; }
}
