using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace CapStoneBEAgenziaImmobiliare.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class GestioneImmobiliController : ControllerBase
    {
        private readonly AgenziaImmobiliareContext _context;
        private readonly ILogger<GestioneImmobiliController> _logger;

        public GestioneImmobiliController(AgenziaImmobiliareContext context, ILogger<GestioneImmobiliController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetImmobili()
        {
            try
            {
                var baseUrl = $"{Request.Scheme}://{Request.Host}/images/immobili/";
                var user = User;
                IQueryable<Immobile> query;

                if (user.IsInRole("Master Broker") || user.IsInRole("Coordinatrice"))
                {
                    query = _context.Immobili.Where(i => !i.Cancellato);
                }
                else
                {
                    if (int.TryParse(User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value, out var userId))
                    {
                        query = _context.Immobili.Where(i => i.FkIdUser == userId && !i.Cancellato);
                    }
                    else
                    {
                        _logger.LogError("UserId claim is missing or not an integer");
                        return Unauthorized("UserId claim is missing or not an integer");
                    }
                }

                var immobili = await query.Select(immobile => new
                {
                    IdImmobile = immobile.IdImmobile,
                    Titolo = immobile.Titolo,
                    Prezzo = immobile.Prezzo,
                    TipoProprieta = immobile.TipoProprietà,
                    Comune = immobile.Comune,
                    Indirizzo = immobile.Indirizzo,
                    CamereDaLetto = immobile.CamereDaLetto,
                    Bagni = immobile.Bagni,
                    Sala = immobile.Sala,
                    Metratura = immobile.Metratura,
                    AltriVani = immobile.AltriVani,
                    ImmagineCopertina = _context.ImmaginiCase
                        .Where(img => img.FkIdImmobile == immobile.IdImmobile && img.ImmagineCopertina)
                        .Select(img => baseUrl + img.Immagine)
                        .FirstOrDefault()
                }).ToListAsync();

                return Ok(immobili);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching properties.");
                return StatusCode(500, "An internal error occurred.");
            }
        }



        [HttpDelete("{id}")]
        [Authorize(Roles = "Master Broker, Coordinatrice")]
        public async Task<IActionResult> DeleteImmobile(int id)
        {
            try
            {
                var immobile = await _context.Immobili.FindAsync(id);
                if (immobile == null)
                {
                    return NotFound("Immobile non trovato.");
                }

                immobile.Cancellato = true;
                _context.Update(immobile);
                await _context.SaveChangesAsync();

                return Ok("Immobile cancellato con successo.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante la cancellazione dell'immobile.");
                return StatusCode(500, "Errore durante la cancellazione dell'immobile.");
            }
        }

        public class ImmobileDto
        {
            public string Titolo { get; set; }
            public string Descrizione { get; set; }
            public decimal Prezzo { get; set; }
            public string TipoProprietà { get; set; }
            public string Comune { get; set; }
            public string Indirizzo { get; set; }
            public int CamereDaLetto { get; set; }
            public int Bagni { get; set; }
            public string Cucina { get; set; }
            public string Sala { get; set; }
            public int? AltriVani { get; set; }
            public decimal Metratura { get; set; }
            public int? Box { get; set; }
            public int? PostiAuto { get; set; }
            public string CaratteristicheSpeciali { get; set; }
            public bool Vetrina { get; set; }
            public bool Pubblicata { get; set; }
            public bool Locazione { get; set; }
            public int? FkIdUser { get; set; }
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "Master Broker, Coordinatrice")]
        public async Task<IActionResult> ModificaImmobile(int id, [FromForm] ImmobileDto immobileDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var immobileEsistente = await _context.Immobili.FindAsync(id);
            if (immobileEsistente == null)
            {
                return NotFound("Immobile non trovato.");
            }

            if (User.IsInRole("Master Broker") && immobileDto.FkIdUser.HasValue)
            {
                immobileEsistente.FkIdUser = immobileDto.FkIdUser;
            }

            immobileEsistente.Titolo = immobileDto.Titolo;
            immobileEsistente.Descrizione = immobileDto.Descrizione;
            immobileEsistente.Prezzo = immobileDto.Prezzo;
            immobileEsistente.TipoProprietà = immobileDto.TipoProprietà;
            immobileEsistente.Comune = immobileDto.Comune;
            immobileEsistente.Indirizzo = immobileDto.Indirizzo;
            immobileEsistente.CamereDaLetto = immobileDto.CamereDaLetto;
            immobileEsistente.Bagni = immobileDto.Bagni;
            immobileEsistente.Cucina = immobileDto.Cucina;
            immobileEsistente.Sala = immobileDto.Sala;
            immobileEsistente.AltriVani = immobileDto.AltriVani;
            immobileEsistente.Metratura = immobileDto.Metratura;
            immobileEsistente.Box = immobileDto.Box;
            immobileEsistente.PostiAuto = immobileDto.PostiAuto;
            immobileEsistente.CaratteristicheSpeciali = immobileDto.CaratteristicheSpeciali;
            immobileEsistente.Vetrina = immobileDto.Vetrina;
            immobileEsistente.Pubblicata = immobileDto.Pubblicata;
            immobileEsistente.Locazione = immobileDto.Locazione;

            try
            {
                _context.Update(immobileEsistente);
                await _context.SaveChangesAsync();
                return Ok("Immobile modificato con successo.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante la modifica dell'immobile.");
                return StatusCode(500, "Errore durante la modifica dell'immobile.");
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetImmobile(int id)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}/images/immobili/";
            var immobile = await _context.Immobili
                .Where(i => i.IdImmobile == id && !i.Cancellato)
                .Select(i => new
                {
                    IdImmobile = i.IdImmobile,
                    Titolo = i.Titolo,
                    Descrizione = i.Descrizione,
                    Prezzo = i.Prezzo,
                    TipoProprietà = i.TipoProprietà,
                    Comune = i.Comune,
                    Indirizzo = i.Indirizzo,
                    CamereDaLetto = i.CamereDaLetto,
                    Bagni = i.Bagni,
                    Cucina = i.Cucina,
                    Sala = i.Sala,
                    AltriVani = i.AltriVani,
                    Metratura = i.Metratura,
                    Box = i.Box,
                    PostiAuto = i.PostiAuto,
                    CaratteristicheSpeciali = i.CaratteristicheSpeciali,
                    Vetrina = i.Vetrina,
                    Pubblicata = i.Pubblicata,
                    Locazione = i.Locazione,
                    FkIdUser = i.FkIdUser,
                    Immagini = i.ImmagineCasa.Select(img => new
                    {
                        IdImmagine = img.IdImmagine,
                        Immagine = baseUrl + img.Immagine,
                        ImmagineCopertina = img.ImmagineCopertina
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (immobile == null)
            {
                return NotFound();
            }

            return Ok(immobile);
        }


        [HttpGet("staff")]
        [Authorize(Roles = "Master Broker, Coordinatrice")]
        public async Task<IActionResult> GetStaffMembers()
        {
            try
            {
                var staffMembers = await _context.Staff
                    .Where(u => !u.Cancellato)
                    .Select(u => new
                    {
                        Id = u.IdUser,
                        Nome = u.Nome,
                        Cognome = u.Cognome
                    })
                    .ToListAsync();

                return Ok(staffMembers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching staff members.");
                return StatusCode(500, "Internal server error while fetching staff members.");
            }
        }

        [HttpPost("{idImmobile}/upload")]
        [Authorize(Roles = "Master Broker, Coordinatr   ")]
        public async Task<IActionResult> UploadImage(int idImmobile, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            string basePath = @"C:\Users\Alessandro\Desktop\Capstone\AgenziaImmobiliare\CapStoneBEAgenziaImmobiliare\CapStoneBEAgenziaImmobiliare.Server\";
            string immobiliDirectory = Path.Combine(basePath, "images", "immobili");


            if (!Directory.Exists(immobiliDirectory))
            {
                Directory.CreateDirectory(immobiliDirectory);
            }

            string filePath = Path.Combine(immobiliDirectory, file.FileName);
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

            _context.ImmaginiCase.Add(immagine);
            await _context.SaveChangesAsync();

            return Ok(new { IdImmagine = immagine.IdImmagine });
        }


        [HttpPost("setCopertina/{idImmagine}")]
        [Authorize(Roles = "Master Broker, Coordinatrice")]
        public async Task<IActionResult> SetAsCover(int idImmagine)
        {
            var immagine = await _context.ImmaginiCase.FindAsync(idImmagine);
            if (immagine == null)
            {
                return NotFound();
            }


            var allImages = _context.ImmaginiCase.Where(i => i.FkIdImmobile == immagine.FkIdImmobile);
            foreach (var img in allImages)
            {
                img.ImmagineCopertina = false;
            }

            immagine.ImmagineCopertina = true;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{idImmobile}/images/{idImmagine}")]
        [Authorize(Roles = "Master Broker, Responsabile Back-Office")]
        public async Task<IActionResult> DeleteImage(int idImmobile, int idImmagine)
        {
            try
            {
                var immobile = await _context.Immobili.FindAsync(idImmobile);
                if (immobile == null)
                {
                    return NotFound("Immobile non trovato.");
                }

                var immagine = await _context.ImmaginiCase.Where(i => i.IdImmagine == idImmagine && i.FkIdImmobile == idImmobile).FirstOrDefaultAsync();
                if (immagine == null)
                {
                    return NotFound("Immagine non trovata.");
                }

                string basePath = @"C:\Users\Alessandro\Desktop\Capstone\AgenziaImmobiliare\CapStoneBEAgenziaImmobiliare\CapStoneBEAgenziaImmobiliare.Server\";
                var filePath = Path.Combine(basePath, "images", "immobili", immagine.Immagine);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }

                _context.ImmaginiCase.Remove(immagine);
                await _context.SaveChangesAsync();

                return Ok("Immagine rimossa con successo.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante la cancellazione dell'immagine.");
                return StatusCode(500, "Errore interno del server.");
            }
        }

    }
}
