using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CapStoneBEAgenziaImmobiliare.Server.Models;

public partial class Ruolo
{
    [Key]
    public int IdRuolo { get; set; }

    public string Role { get; set; } = null!;
}
