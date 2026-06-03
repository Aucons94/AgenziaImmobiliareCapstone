using CapStoneBEAgenziaImmobiliare.Server.DTOs.Immobile;
using CapStoneBEAgenziaImmobiliare.Server.DTOs.User;
using Microsoft.AspNetCore.Http;

namespace CapStoneBEAgenziaImmobiliare.Server.Interfaces
{
    public interface IImmobileService
    {
        Task<IEnumerable<ImmobileResponseDto>> GetAllImmobiliAsync(int? userId, bool isMasterOrCoordinator, string baseUrl);
        Task<ImmobileDetailDto> GetImmobileByIdAsync(int id, string baseUrl);
        Task<ImmobileDetailDto> UpdateImmobileAsync(int id, ImmobileDto immobileDto, bool isMasterBroker);
        Task<bool> DeleteImmobileAsync(int id);
        Task<IEnumerable<StaffMemberDto>> GetStaffMembersAsync();
        Task<int> UploadImageAsync(int idImmobile, IFormFile file, string basePath);
        Task<bool> SetCoverImageAsync(int idImmagine);
        Task<bool> DeleteImageAsync(int idImmobile, int idImmagine, string basePath);
    }
}
