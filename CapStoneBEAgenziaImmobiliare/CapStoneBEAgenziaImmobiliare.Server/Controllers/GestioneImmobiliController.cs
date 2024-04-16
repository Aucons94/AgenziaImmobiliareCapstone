using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.Extensions.Logging;

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

                if (user.IsInRole("Master Broker") || user.IsInRole("Responsabile Back Office"))
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

    }
}
