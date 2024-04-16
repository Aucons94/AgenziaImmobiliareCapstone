using Microsoft.AspNetCore.Mvc;
using CapStoneBEAgenziaImmobiliare.Server.Models;

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
            var immobile = await _context.Immobili.FindAsync(id);

            if (immobile == null)
            {
                return NotFound("Immobile non trovato.");
            }

            return Ok(immobile);
        }
    }
}
