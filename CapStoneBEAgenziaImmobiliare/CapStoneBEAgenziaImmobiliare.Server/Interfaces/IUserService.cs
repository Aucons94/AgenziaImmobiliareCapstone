using CapStoneBEAgenziaImmobiliare.Server.DTOs.User;
using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.AspNetCore.Http;

namespace CapStoneBEAgenziaImmobiliare.Server.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponseDto>> GetAllUsersAsync();
        Task<UserDetailDto> GetUserByIdAsync(int id, string baseUrl);
        Task<UserDetailDto> UpdateUserAsync(int id, UserDto userDto, IFormFile foto, string staffImagesPath);
        Task<bool> DeleteUserAsync(int id);
        Task<IEnumerable<Ruolo>> GetRuoliAsync();
        Task<User> CreateUserAsync(UserDto userDto, IFormFile foto, string staffImagesPath);
    }
}
