namespace CapStoneBEAgenziaImmobiliare.Server.DTOs.User
{
    public class UserDto
    {
        public string Nome { get; set; }
        public string Cognome { get; set; }
        public string Telefono { get; set; }
        public int? FkIdRuolo { get; set; }
        public string Password { get; set; }
    }
}
