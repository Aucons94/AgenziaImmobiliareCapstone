using CapStoneBEAgenziaImmobiliare.Server.Models;

namespace CapStoneBEAgenziaImmobiliare.Server.Interfaces
{
    public interface IImmobileRepository
    {
        Task<IEnumerable<Immobile>> GetAllAsync(int? userId = null, bool isMasterOrCoordinator = false);
        Task<Immobile> GetByIdAsync(int id);
        Task<Immobile> CreateAsync(Immobile immobile);
        Task<Immobile> UpdateAsync(Immobile immobile);
        Task<bool> SoftDeleteAsync(int id);
        Task<ImmagineCasa> AddImageAsync(ImmagineCasa immagine);
        Task<bool> SetCoverImageAsync(int idImmagine);
        Task<bool> DeleteImageAsync(int idImmagine);
        Task<ImmagineCasa> GetImageByIdAsync(int idImmagine);
    }
}
