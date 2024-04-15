using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CapStoneBEAgenziaImmobiliare.Server.Models;

public partial class Immobile
{
    [Key]
    public int IdImmobile { get; set; }

    [ForeignKey("User")]
    public int? FkIdUser { get; set; }

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

    public virtual User User { get; set; }

    public virtual ICollection<ImmagineCasa> ImmagineCasa { get; set; }
}
