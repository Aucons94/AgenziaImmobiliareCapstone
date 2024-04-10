using System;
using System.Collections.Generic;

namespace CapStoneBEAgenziaImmobiliare.Server.Models;

public partial class Immobili
{
    public int IdImmobile { get; set; }

    public int? FkIdStaff { get; set; }

    public string Titolo { get; set; } = null!;

    public string? Descrizione { get; set; }

    public decimal Prezzo { get; set; }

    public string TipoProprietà { get; set; } = null!;

    public string Comune { get; set; } = null!;

    public string Indirizzo { get; set; } = null!;

    public int CamereDaLetto { get; set; }

    public int Bagni { get; set; }

    public string Cucina { get; set; } = null!;

    public string? Sala { get; set; }

    public int? AltriVani { get; set; }

    public decimal Metratura { get; set; }

    public int? Box { get; set; }

    public int? PostiAuto { get; set; }

    public string? CaratteristicheSpeciali { get; set; }

    public bool Vetrina { get; set; }

    public bool Pubblicata { get; set; }

    public bool Cancellato { get; set; }

    public bool Locazione { get; set; }

    public virtual Staff? FkIdStaffNavigation { get; set; }

    public virtual ICollection<ImmaginiCase> ImmaginiCase { get; set; } = new List<ImmaginiCase>();
}
