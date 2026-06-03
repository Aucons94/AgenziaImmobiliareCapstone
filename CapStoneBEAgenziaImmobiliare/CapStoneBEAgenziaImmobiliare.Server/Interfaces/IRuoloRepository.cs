using CapStoneBEAgenziaImmobiliare.Server.Models;

namespace CapStoneBEAgenziaImmobiliare.Server.Interfaces
{
    public interface IRuoloRepository
    {
        Task<IEnumerable<Ruolo>> GetAllAsync();
    }
}
