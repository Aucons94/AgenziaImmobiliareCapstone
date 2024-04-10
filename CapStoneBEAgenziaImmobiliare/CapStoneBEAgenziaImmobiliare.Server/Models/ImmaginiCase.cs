using System;
using System.Collections.Generic;

namespace CapStoneBEAgenziaImmobiliare.Server.Models;

public partial class ImmaginiCase
{
    public int IdImmagine { get; set; }

    public int FkIdImmobile { get; set; }

    public string Immagine { get; set; } = null!;

    public string? DescrizioneImmagine { get; set; }

    public bool ImmagineCopertina { get; set; }

    public virtual Immobili FkIdImmobileNavigation { get; set; } = null!;
}
