using CapStoneBEAgenziaImmobiliare.Server.Interfaces;
using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CapStoneBEAgenziaImmobiliare.Server.Repositories
{
    public class ValutazioneRepository : IValutazioneRepository
    {
        private readonly AgenziaImmobiliareContext _context;

        public ValutazioneRepository(AgenziaImmobiliareContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RichiestaValutazione>> GetAllAsync()
        {
            return await _context.RichiesteValutazione
                .Include(r => r.Cliente)
                .Where(r => !r.Cancellato)
                .ToListAsync();
        }

        public async Task<RichiestaValutazione> GetByIdAsync(int id)
        {
            return await _context.RichiesteValutazione
                .Include(r => r.Cliente)
                .FirstOrDefaultAsync(r => r.IdValutazione == id && !r.Cancellato);
        }

        public async Task<bool> SoftDeleteAsync(int id)
        {
            var valutazione = await _context.RichiesteValutazione.FindAsync(id);
            if (valutazione == null) return false;

            valutazione.Cancellato = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ToggleActiveAsync(int id)
        {
            var valutazione = await _context.RichiesteValutazione.FindAsync(id);
            if (valutazione == null) return false;

            valutazione.Attivo = !valutazione.Attivo;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
