using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CapStoneBEAgenziaImmobiliare.Server.Models;

public partial class RichiestaValutazione
{
    [Key]
    public int IdValutazione { get; set; }

    [ForeignKey("Cliente")]
    public int FkIdCliente { get; set; }

    [ForeignKey("User")]
    public int? FkIdUser { get; set; }

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

    public bool Attivo { get; set; }

    public bool Cancellato { get; set; }

    public virtual Cliente Cliente { get; set; }

    public virtual User User { get; set; }
}
