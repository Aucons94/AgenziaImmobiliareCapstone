using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CapStoneBEAgenziaImmobiliare.Server.Models;

public partial class ImmagineCasa
{
    [Key]
    public int IdImmagine { get; set; }

    [ForeignKey("Immobile")]
    public int FkIdImmobile { get; set; }

    public string Immagine { get; set; } = null!;

    public string? DescrizioneImmagine { get; set; }

    public bool ImmagineCopertina { get; set; }

    public virtual Immobile Immobile { get; set; } = null!;
}
