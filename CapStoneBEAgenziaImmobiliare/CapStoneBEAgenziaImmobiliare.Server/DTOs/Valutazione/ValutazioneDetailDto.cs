namespace CapStoneBEAgenziaImmobiliare.Server.DTOs.Valutazione
{
    public class ValutazioneDetailDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cognome { get; set; }
        public string Cellulare { get; set; }
        public string Email { get; set; }
        public decimal Metratura { get; set; }
        public string Indirizzo { get; set; }
        public int CamereDaLetto { get; set; }
        public int Bagni { get; set; }
        public string Cucina { get; set; }
        public string Sala { get; set; }
        public int? AltriVani { get; set; }
        public int? Box { get; set; }
        public int? PostiAuto { get; set; }
        public string CaratteristicheSpeciali { get; set; }
        public bool Attivo { get; set; }
    }
}
