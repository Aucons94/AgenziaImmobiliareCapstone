using CapStoneBEAgenziaImmobiliare.Server.DTOs.Valutazione;

namespace CapStoneBEAgenziaImmobiliare.Server.Interfaces
{
    public interface IValutazioneService
    {
        Task<IEnumerable<ValutazioneDto>> GetAllValutazioniAsync();
        Task<ValutazioneDetailDto> GetValutazioneByIdAsync(int id);
        Task<bool> DeleteValutazioneAsync(int id);
        Task<bool> ToggleActiveAsync(int id);
    }
}
