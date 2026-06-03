namespace CapStoneBEAgenziaImmobiliare.Server.DTOs.Immobile
{
    public class ImmobileResponseDto
    {
        public int IdImmobile { get; set; }
        public string Titolo { get; set; }
        public decimal Prezzo { get; set; }
        public string TipoProprieta { get; set; }
        public string Comune { get; set; }
        public string Indirizzo { get; set; }
        public int CamereDaLetto { get; set; }
        public int Bagni { get; set; }
        public decimal Metratura { get; set; }
        public int? AltriVani { get; set; }
        public string ImmagineCopertina { get; set; }
    }
}
