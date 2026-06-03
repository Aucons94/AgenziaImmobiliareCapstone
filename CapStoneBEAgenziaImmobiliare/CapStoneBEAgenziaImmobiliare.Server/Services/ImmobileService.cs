using CapStoneBEAgenziaImmobiliare.Server.DTOs.Immobile;
using CapStoneBEAgenziaImmobiliare.Server.DTOs.User;
using CapStoneBEAgenziaImmobiliare.Server.Interfaces;
using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.AspNetCore.Http;

namespace CapStoneBEAgenziaImmobiliare.Server.Services
{
    public class ImmobileService : IImmobileService
    {
        private readonly IImmobileRepository _immobileRepository;
        private readonly IUserRepository _userRepository;

        public ImmobileService(IImmobileRepository immobileRepository, IUserRepository userRepository)
        {
            _immobileRepository = immobileRepository;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<ImmobileResponseDto>> GetAllImmobiliAsync(int? userId, bool isMasterOrCoordinator, string baseUrl)
        {
            var immobili = await _immobileRepository.GetAllAsync(userId, isMasterOrCoordinator);

            return immobili.Select(i => new ImmobileResponseDto
            {
                IdImmobile = i.IdImmobile,
                Titolo = i.Titolo,
                Prezzo = i.Prezzo,
                TipoProprieta = i.TipoProprietà,
                Comune = i.Comune,
                Indirizzo = i.Indirizzo,
                CamereDaLetto = i.CamereDaLetto,
                Bagni = i.Bagni,
                Metratura = i.Metratura,
                AltriVani = i.AltriVani,
                ImmagineCopertina = i.ImmagineCasa
                    .Where(img => img.ImmagineCopertina)
                    .Select(img => baseUrl + img.Immagine)
                    .FirstOrDefault()
            }).ToList();
        }

        public async Task<ImmobileDetailDto> GetImmobileByIdAsync(int id, string baseUrl)
        {
            var immobile = await _immobileRepository.GetByIdAsync(id);
            if (immobile == null) return null;

            return new ImmobileDetailDto
            {
                IdImmobile = immobile.IdImmobile,
                Titolo = immobile.Titolo,
                Descrizione = immobile.Descrizione,
                Prezzo = immobile.Prezzo,
                TipoProprietà = immobile.TipoProprietà,
                Comune = immobile.Comune,
                Indirizzo = immobile.Indirizzo,
                CamereDaLetto = immobile.CamereDaLetto,
                Bagni = immobile.Bagni,
                Cucina = immobile.Cucina,
                Sala = immobile.Sala,
                AltriVani = immobile.AltriVani,
                Metratura = immobile.Metratura,
                Box = immobile.Box,
                PostiAuto = immobile.PostiAuto,
                CaratteristicheSpeciali = immobile.CaratteristicheSpeciali,
                Vetrina = immobile.Vetrina,
                Pubblicata = immobile.Pubblicata,
                Locazione = immobile.Locazione,
                FkIdUser = immobile.FkIdUser,
                Immagini = immobile.ImmagineCasa.Select(img => new ImmagineDto
                {
                    IdImmagine = img.IdImmagine,
                    Immagine = baseUrl + img.Immagine,
                    ImmagineCopertina = img.ImmagineCopertina
                }).ToList()
            };
        }

        public async Task<ImmobileDetailDto> UpdateImmobileAsync(int id, ImmobileDto immobileDto, bool isMasterBroker)
        {
            var immobile = await _immobileRepository.GetByIdAsync(id);
            if (immobile == null) return null;

            if (isMasterBroker && immobileDto.FkIdUser.HasValue)
            {
                immobile.FkIdUser = immobileDto.FkIdUser;
            }

            immobile.Titolo = immobileDto.Titolo;
            immobile.Descrizione = immobileDto.Descrizione;
            immobile.Prezzo = immobileDto.Prezzo;
            immobile.TipoProprietà = immobileDto.TipoProprietà;
            immobile.Comune = immobileDto.Comune;
            immobile.Indirizzo = immobileDto.Indirizzo;
            immobile.CamereDaLetto = immobileDto.CamereDaLetto;
            immobile.Bagni = immobileDto.Bagni;
            immobile.Cucina = immobileDto.Cucina;
            immobile.Sala = immobileDto.Sala;
            immobile.AltriVani = immobileDto.AltriVani;
            immobile.Metratura = immobileDto.Metratura;
            immobile.Box = immobileDto.Box;
            immobile.PostiAuto = immobileDto.PostiAuto;
            immobile.CaratteristicheSpeciali = immobileDto.CaratteristicheSpeciali;
            immobile.Vetrina = immobileDto.Vetrina;
            immobile.Pubblicata = immobileDto.Pubblicata;
            immobile.Locazione = immobileDto.Locazione;

            await _immobileRepository.UpdateAsync(immobile);

            return new ImmobileDetailDto
            {
                IdImmobile = immobile.IdImmobile,
                Titolo = immobile.Titolo,
                Descrizione = immobile.Descrizione,
                Prezzo = immobile.Prezzo,
                TipoProprietà = immobile.TipoProprietà,
                Comune = immobile.Comune,
                Indirizzo = immobile.Indirizzo,
                CamereDaLetto = immobile.CamereDaLetto,
                Bagni = immobile.Bagni,
                Cucina = immobile.Cucina,
                Sala = immobile.Sala,
                AltriVani = immobile.AltriVani,
                Metratura = immobile.Metratura,
                Box = immobile.Box,
                PostiAuto = immobile.PostiAuto,
                CaratteristicheSpeciali = immobile.CaratteristicheSpeciali,
                Vetrina = immobile.Vetrina,
                Pubblicata = immobile.Pubblicata,
                Locazione = immobile.Locazione,
                FkIdUser = immobile.FkIdUser
            };
        }

        public async Task<bool> DeleteImmobileAsync(int id)
        {
            return await _immobileRepository.SoftDeleteAsync(id);
        }

        public async Task<IEnumerable<StaffMemberDto>> GetStaffMembersAsync()
        {
            var staff = await _userRepository.GetStaffMembersAsync();
            return staff.Select(s => new StaffMemberDto
            {
                Id = s.IdUser,
                Nome = s.Nome,
                Cognome = s.Cognome
            }).ToList();
        }

        public async Task<int> UploadImageAsync(int idImmobile, IFormFile file, string basePath)
        {
            if (!Directory.Exists(basePath))
            {
                Directory.CreateDirectory(basePath);
            }

            string filePath = Path.Combine(basePath, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var immagine = new ImmagineCasa
            {
                FkIdImmobile = idImmobile,
                Immagine = file.FileName,
                ImmagineCopertina = false
            };

            var result = await _immobileRepository.AddImageAsync(immagine);
            return result.IdImmagine;
        }

        public async Task<bool> SetCoverImageAsync(int idImmagine)
        {
            return await _immobileRepository.SetCoverImageAsync(idImmagine);
        }

        public async Task<bool> DeleteImageAsync(int idImmobile, int idImmagine, string basePath)
        {
            var immagine = await _immobileRepository.GetImageByIdAsync(idImmagine);
            if (immagine == null || immagine.FkIdImmobile != idImmobile) return false;

            var filePath = Path.Combine(basePath, immagine.Immagine);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            return await _immobileRepository.DeleteImageAsync(idImmagine);
        }
    }
}
