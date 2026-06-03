using CapStoneBEAgenziaImmobiliare.Server.Interfaces;
using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CapStoneBEAgenziaImmobiliare.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AgenziaImmobiliareContext _context;

        public UserRepository(AgenziaImmobiliareContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Staff
                .Include(u => u.Ruolo)
                .Where(u => !u.Cancellato)
                .ToListAsync();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _context.Staff
                .Include(u => u.Ruolo)
                .FirstOrDefaultAsync(u => u.IdUser == id);
        }

        public async Task<User> CreateAsync(User user)
        {
            _context.Staff.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateAsync(User user)
        {
            _context.Staff.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> SoftDeleteAsync(int id)
        {
            var user = await _context.Staff.FindAsync(id);
            if (user == null) return false;

            user.Cancellato = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<User>> GetStaffMembersAsync()
        {
            return await _context.Staff
                .Where(u => !u.Cancellato)
                .ToListAsync();
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Staff.AnyAsync(e => e.IdUser == id);
        }
    }
}
