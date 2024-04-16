using Microsoft.AspNetCore.Mvc;
using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CapStoneBEAgenziaImmobiliare.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DettagliController : ControllerBase
    {
        private readonly AgenziaImmobiliareContext _context;

        public DettagliController(AgenziaImmobiliareContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImmobile(int id)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}/images/immobili/";
            var immobile = await _context.Immobili
                .Where(i => i.IdImmobile == id)
                .Include(i => i.ImmagineCasa) 
                .Select(i => new
                {
                    i.IdImmobile,
                    i.Titolo,
                    i.Descrizione,
                    i.Prezzo,
                    i.TipoProprietà,
                    i.Comune,
                    i.Indirizzo,
                    i.CamereDaLetto,
                    i.Bagni,
                    i.Cucina,
                    i.Sala,
                    i.AltriVani,
                    i.Metratura,
                    i.Box,
                    i.PostiAuto,
                    i.CaratteristicheSpeciali,
                    Immagini = i.ImmagineCasa.Select(ic => new
                    {
                        Immagine = baseUrl + ic.Immagine,
                        ic.ImmagineCopertina
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (immobile == null)
            {
                return NotFound("Immobile non trovato.");
            }

            return Ok(immobile);
        }
    }
}
