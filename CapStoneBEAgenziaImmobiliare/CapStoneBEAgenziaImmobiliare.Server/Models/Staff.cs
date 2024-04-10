using System;
using System.Collections.Generic;

namespace CapStoneBEAgenziaImmobiliare.Server.Models;

public partial class Staff
{
    public int IdStaff { get; set; }

    public int FkIdRuolo { get; set; }

    public string Nome { get; set; } = null!;

    public string Cognome { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public string? Foto { get; set; }

    public bool Cancellato { get; set; }

    public virtual ICollection<Clienti> Clienti { get; set; } = new List<Clienti>();

    public virtual ICollection<Immobili> Immobili { get; set; } = new List<Immobili>();

    public virtual ICollection<RichiesteValutazione> RichiesteValutazione { get; set; } = new List<RichiesteValutazione>();

    public virtual ICollection<Richieste> Richieste { get; set; } = new List<Richieste>();
}
