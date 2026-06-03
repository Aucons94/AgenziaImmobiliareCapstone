using CapStoneBEAgenziaImmobiliare.Server.Interfaces;
using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CapStoneBEAgenziaImmobiliare.Server.Repositories
{
    public class RuoloRepository : IRuoloRepository
    {
        private readonly AgenziaImmobiliareContext _context;

        public RuoloRepository(AgenziaImmobiliareContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Ruolo>> GetAllAsync()
        {
            return await _context.Ruoli.ToListAsync();
        }
    }
}
