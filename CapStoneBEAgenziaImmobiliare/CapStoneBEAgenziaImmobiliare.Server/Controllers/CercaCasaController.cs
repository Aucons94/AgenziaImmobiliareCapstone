using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using CapStoneBEAgenziaImmobiliare.Server.Models;

namespace CapStoneBEAgenziaImmobiliare.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CercaCasaController : ControllerBase
    {
        private readonly AgenziaImmobiliareContext _context;

        public CercaCasaController(AgenziaImmobiliareContext context)
        {
            _context = context;
        }

        [HttpGet("cercaImmobili")]
        public async Task<IActionResult> CercaImmobili(
            [FromQuery] string? tipoProprieta = "Immobili Residenziali",
            [FromQuery] bool locazione = false, 
            [FromQuery] string? ricerca = "")
        {
            var mappaturaTipoProprieta = tipoProprieta switch
            {
                "Immobili Residenziali" => "Residenziale",
                "Immobili Commerciali" => "Commerciale",
                "Terreni" => "Terreno",
                _ => tipoProprieta
            };

            var baseUrl = $"{Request.Scheme}://{Request.Host}/images/immobili/";
            var query = _context.Immobili
                .Where(i => !i.Cancellato && i.TipoProprietà == mappaturaTipoProprieta && i.Locazione == locazione) 
                .AsQueryable();

            if (!string.IsNullOrEmpty(ricerca))
            {
                query = query.Where(i => EF.Functions.Like(i.Comune, $"%{ricerca}%") || EF.Functions.Like(i.Indirizzo, $"%{ricerca}%"));
            }

            var risultatiRicerca = await query
                .Select(immobile => new
                {
                    immobile.Titolo,
                    immobile.Prezzo,
                    TipoProprieta = immobile.TipoProprietà,
                    immobile.Comune,
                    immobile.Indirizzo,
                    CamereDaLetto = immobile.CamereDaLetto,
                    immobile.Bagni,
                    immobile.Sala,
                    immobile.Metratura,
                    ImmagineCopertina = _context.ImmaginiCase
                        .Where(img => img.FkIdImmobile == immobile.IdImmobile && img.ImmagineCopertina)
                        .Select(img => baseUrl + img.Immagine)
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(risultatiRicerca);
        }
    }
}
