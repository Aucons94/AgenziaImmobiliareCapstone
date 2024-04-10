using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CapStoneBEAgenziaImmobiliare.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly AgenziaImmobiliareContext _context;

        public HomeController(AgenziaImmobiliareContext context)
        {
            _context = context;
        }

        [HttpGet ("staff")]
        public async Task<IActionResult> GetStaff()
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}/images/staff/";
            var staffList = await _context.Staff
                .Join(_context.Ruoli, 
                      staff => staff.FkIdRuolo, 
                      ruolo => ruolo.IdRuolo, 
                      (staff, ruolo) => new 
                      {
                          Nome = staff.Nome,
                          Cognome = staff.Cognome,
                          Foto = staff.Foto != null ? baseUrl + Path.GetFileName(staff.Foto) : null,
                          Ruolo = ruolo.Ruolo
                      })
                .ToListAsync();

            return Ok(staffList);
        }

        [HttpGet("immobili")]
        public async Task<IActionResult> GetImmobiliInVetrina()
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}/images/immobili/"; 
            var immobiliInVetrina = await _context.Immobili
                .Where(immobile => immobile.Vetrina && !immobile.Cancellato)
                .Select(immobile => new
                {
                    immobile.IdImmobile,
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

            return Ok(immobiliInVetrina);
        }
    }
}
