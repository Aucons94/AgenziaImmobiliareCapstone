using CapStoneBEAgenziaImmobiliare.Server.Models;

namespace CapStoneBEAgenziaImmobiliare.Server.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> GetByIdAsync(int id);
        Task<User> CreateAsync(User user);
        Task<User> UpdateAsync(User user);
        Task<bool> SoftDeleteAsync(int id);
        Task<IEnumerable<User>> GetStaffMembersAsync();
        Task<bool> ExistsAsync(int id);
    }
}
