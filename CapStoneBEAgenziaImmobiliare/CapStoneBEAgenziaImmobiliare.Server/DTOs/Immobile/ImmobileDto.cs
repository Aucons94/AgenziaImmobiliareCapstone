namespace CapStoneBEAgenziaImmobiliare.Server.DTOs.Immobile
{
    public class ImmobileDto
    {
        public string Titolo { get; set; }
        public string Descrizione { get; set; }
        public decimal Prezzo { get; set; }
        public string TipoProprietà { get; set; }
        public string Comune { get; set; }
        public string Indirizzo { get; set; }
        public int CamereDaLetto { get; set; }
        public int Bagni { get; set; }
        public string Cucina { get; set; }
        public string Sala { get; set; }
        public int? AltriVani { get; set; }
        public decimal Metratura { get; set; }
        public int? Box { get; set; }
        public int? PostiAuto { get; set; }
        public string CaratteristicheSpeciali { get; set; }
        public bool Vetrina { get; set; }
        public bool Pubblicata { get; set; }
        public bool Locazione { get; set; }
        public int? FkIdUser { get; set; }
    }
}
