using System;
using System.Collections.Generic;

namespace CapStoneBEAgenziaImmobiliare.Server.Models;

public partial class Clienti
{
    public int IdClienti { get; set; }

    public int? FkIdstaff { get; set; }

    public string Nome { get; set; } = null!;

    public string Cognome { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public string? DettagliAggiuntivi { get; set; }

    public bool Attivo { get; set; }

    public bool Cancellato { get; set; }

    public virtual Staff? FkIdstaffNavigation { get; set; }

    public virtual ICollection<RichiesteValutazione> RichiesteValutazione { get; set; } = new List<RichiesteValutazione>();

    public virtual ICollection<Richieste> Richieste { get; set; } = new List<Richieste>();
}
