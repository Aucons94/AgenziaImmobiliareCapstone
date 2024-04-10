using System;
using System.Collections.Generic;

namespace CapStoneBEAgenziaImmobiliare.Server.Models;

public partial class Richieste
{
    public int IdRichiesta { get; set; }

    public int FkIdCliente { get; set; }

    public int? FkIdStaff { get; set; }

    public int CamereDaLetto { get; set; }

    public int Bagni { get; set; }

    public string Cucina { get; set; } = null!;

    public string? Sala { get; set; }

    public decimal Metratura { get; set; }

    public int? Box { get; set; }

    public int? PostiAuto { get; set; }

    public bool Attivo { get; set; }

    public bool Cancellato { get; set; }

    public virtual Clienti FkIdClienteNavigation { get; set; } = null!;

    public virtual Staff? FkIdStaffNavigation { get; set; }
}
