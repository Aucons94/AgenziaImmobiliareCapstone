using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



[Authorize]
[Route("[controller]")]
[ApiController]
public class GestioneValutazioniController : ControllerBase
{
    private readonly AgenziaImmobiliareContext _context;

    public GestioneValutazioniController(AgenziaImmobiliareContext context)
    {
        _context = context;
    }

    public class ValutazioneDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cognome { get; set; }
        public string Cellulare { get; set; }
        public decimal Metratura { get; set; }
        public string Indirizzo { get; set; }
        public bool Attivo { get; set; }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ValutazioneDto>>> GetValutazioni()
    {
        var valutazioni = await _context.RichiesteValutazione
            .Include(r => r.Cliente)
            .Where(r => !r.Cancellato) 
            .Select(r => new ValutazioneDto
            {
                Id = r.IdValutazione,
                Nome = r.Cliente.Nome,
                Cognome = r.Cliente.Cognome,
                Cellulare = r.Cliente.Telefono,
                Metratura = r.Metratura,
                Indirizzo = r.Indirizzo,
                Attivo = r.Attivo
            })
            .ToListAsync();

        return Ok(valutazioni);
    }



    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteValutazione(int id)
    {
        var valutazione = await _context.RichiesteValutazione.FindAsync(id);

        if (valutazione == null)
        {
            return NotFound();
        }

        valutazione.Cancellato = true; 
        await _context.SaveChangesAsync();

        return Ok("Valutazione cancellata con successo.");
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<dynamic>> GetValutazioneDettagli(int id)
    {
        var valutazione = await _context.RichiesteValutazione
            .Include(r => r.Cliente)
            .Where(r => r.IdValutazione == id && !r.Cancellato)
            .Select(r => new
            {

                Id = r.IdValutazione,
                Nome = r.Cliente.Nome,
                Cognome = r.Cliente.Cognome,
                Cellulare = r.Cliente.Telefono,
                Email = r.Cliente.Email,
                Metratura = r.Metratura,
                Indirizzo = r.Indirizzo,
                CamereDaLetto = r.CamereDaLetto,
                Bagni = r.Bagni,
                Cucina = r.Cucina,
                Sala = r.Sala,
                AltriVani = r.AltriVani,
                Box = r.Box,
                PostiAuto = r.PostiAuto,
                CaratteristicheSpeciali = r.CaratteristicheSpeciali,
                Attivo = r.Attivo,

            })
            .FirstOrDefaultAsync();

        if (valutazione == null)
        {
            return NotFound();
        }

        return valutazione; 
    }

    [HttpPut("{id}/attivo")]
    public async Task<IActionResult> ToggleActive(int id)
    {
        var valutazione = await _context.RichiesteValutazione.FindAsync(id);
        if (valutazione == null)
        {
            return NotFound();
        }

        valutazione.Attivo = !valutazione.Attivo; 
        await _context.SaveChangesAsync();

        return NoContent(); 
    }

}
