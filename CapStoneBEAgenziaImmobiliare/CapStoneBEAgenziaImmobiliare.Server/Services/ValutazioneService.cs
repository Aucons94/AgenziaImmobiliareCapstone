using CapStoneBEAgenziaImmobiliare.Server.DTOs.Valutazione;
using CapStoneBEAgenziaImmobiliare.Server.Interfaces;

namespace CapStoneBEAgenziaImmobiliare.Server.Services
{
    public class ValutazioneService : IValutazioneService
    {
        private readonly IValutazioneRepository _valutazioneRepository;

        public ValutazioneService(IValutazioneRepository valutazioneRepository)
        {
            _valutazioneRepository = valutazioneRepository;
        }

        public async Task<IEnumerable<ValutazioneDto>> GetAllValutazioniAsync()
        {
            var valutazioni = await _valutazioneRepository.GetAllAsync();
            return valutazioni.Select(v => new ValutazioneDto
            {
                Id = v.IdValutazione,
                Nome = v.Cliente.Nome,
                Cognome = v.Cliente.Cognome,
                Cellulare = v.Cliente.Telefono,
                Indirizzo = v.Indirizzo,
                Attivo = v.Attivo
            }).ToList();
        }

        public async Task<ValutazioneDetailDto> GetValutazioneByIdAsync(int id)
        {
            var valutazione = await _valutazioneRepository.GetByIdAsync(id);
            if (valutazione == null) return null;

            return new ValutazioneDetailDto
            {
                Id = valutazione.IdValutazione,
                Nome = valutazione.Cliente.Nome,
                Cognome = valutazione.Cliente.Cognome,
                Cellulare = valutazione.Cliente.Telefono,
                Email = valutazione.Cliente.Email,
                Metratura = valutazione.Metratura,
                Indirizzo = valutazione.Indirizzo,
                CamereDaLetto = valutazione.CamereDaLetto,
                Bagni = valutazione.Bagni,
                Cucina = valutazione.Cucina,
                Sala = valutazione.Sala,
                AltriVani = valutazione.AltriVani,
                Box = valutazione.Box,
                PostiAuto = valutazione.PostiAuto,
                CaratteristicheSpeciali = valutazione.CaratteristicheSpeciali,
                Attivo = valutazione.Attivo
            };
        }

        public async Task<bool> DeleteValutazioneAsync(int id)
        {
            return await _valutazioneRepository.SoftDeleteAsync(id);
        }

        public async Task<bool> ToggleActiveAsync(int id)
        {
            return await _valutazioneRepository.ToggleActiveAsync(id);
        }
    }
}
