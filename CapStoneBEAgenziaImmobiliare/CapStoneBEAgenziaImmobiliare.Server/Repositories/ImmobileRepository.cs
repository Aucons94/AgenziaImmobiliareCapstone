using CapStoneBEAgenziaImmobiliare.Server.Interfaces;
using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CapStoneBEAgenziaImmobiliare.Server.Repositories
{
    public class ImmobileRepository : IImmobileRepository
    {
        private readonly AgenziaImmobiliareContext _context;

        public ImmobileRepository(AgenziaImmobiliareContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Immobile>> GetAllAsync(int? userId = null, bool isMasterOrCoordinator = false)
        {
            IQueryable<Immobile> query = _context.Immobili.Where(i => !i.Cancellato);

            if (!isMasterOrCoordinator && userId.HasValue)
            {
                query = query.Where(i => i.FkIdUser == userId);
            }

            return await query.ToListAsync();
        }

        public async Task<Immobile> GetByIdAsync(int id)
        {
            return await _context.Immobili
                .Include(i => i.ImmagineCasa)
                .FirstOrDefaultAsync(i => i.IdImmobile == id && !i.Cancellato);
        }

        public async Task<Immobile> CreateAsync(Immobile immobile)
        {
            _context.Immobili.Add(immobile);
            await _context.SaveChangesAsync();
            return immobile;
        }

        public async Task<Immobile> UpdateAsync(Immobile immobile)
        {
            _context.Immobili.Update(immobile);
            await _context.SaveChangesAsync();
            return immobile;
        }

        public async Task<bool> SoftDeleteAsync(int id)
        {
            var immobile = await _context.Immobili.FindAsync(id);
            if (immobile == null) return false;

            immobile.Cancellato = true;
            _context.Update(immobile);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ImmagineCasa> AddImageAsync(ImmagineCasa immagine)
        {
            _context.ImmaginiCase.Add(immagine);
            await _context.SaveChangesAsync();
            return immagine;
        }

        public async Task<bool> SetCoverImageAsync(int idImmagine)
        {
            var immagine = await _context.ImmaginiCase.FindAsync(idImmagine);
            if (immagine == null) return false;

            var allImages = _context.ImmaginiCase.Where(i => i.FkIdImmobile == immagine.FkIdImmobile);
            foreach (var img in allImages)
            {
                img.ImmagineCopertina = false;
            }

            immagine.ImmagineCopertina = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteImageAsync(int idImmagine)
        {
            var immagine = await _context.ImmaginiCase.FindAsync(idImmagine);
            if (immagine == null) return false;

            _context.ImmaginiCase.Remove(immagine);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ImmagineCasa> GetImageByIdAsync(int idImmagine)
        {
            return await _context.ImmaginiCase.FindAsync(idImmagine);
        }
    }
}
