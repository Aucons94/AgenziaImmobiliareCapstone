using CapStoneBEAgenziaImmobiliare.Server.Models;

namespace CapStoneBEAgenziaImmobiliare.Server.Interfaces
{
    public interface IValutazioneRepository
    {
        Task<IEnumerable<RichiestaValutazione>> GetAllAsync();
        Task<RichiestaValutazione> GetByIdAsync(int id);
        Task<bool> SoftDeleteAsync(int id);
        Task<bool> ToggleActiveAsync(int id);
    }
}
