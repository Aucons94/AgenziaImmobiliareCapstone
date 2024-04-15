using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace CapStoneBEAgenziaImmobiliare.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VendiCasaController : ControllerBase
    {
        private readonly AgenziaImmobiliareContext _context;

        public VendiCasaController(AgenziaImmobiliareContext context)
        {
            _context = context;
        }

        public class ClienteValutazioneDTO
        {
            public string Nome { get; set; }
            public string Cognome { get; set; }
            public string Email { get; set; }
            public string Telefono { get; set; }
            public string Indirizzo { get; set; }
            public int CamereDaLetto { get; set; }
            public int Bagni { get; set; }
            public string Cucina { get; set; }
            public string? Sala { get; set; }
            public int? AltriVani { get; set; }
            public decimal Metratura { get; set; }
            public int? Box { get; set; }
            public int? PostiAuto { get; set; }
            public string CaratteristicheSpeciali { get; set; }
        }

        [HttpPost]
        public async Task<IActionResult> PostClienteValutazione([FromBody] ClienteValutazioneDTO dto)
        {
            if (!ModelState.IsValid)
            {
                foreach (var modelStateKey in ModelState.Keys)
                {
                    var modelStateVal = ModelState[modelStateKey];
                    foreach (var error in modelStateVal.Errors)
                    {
                        Console.WriteLine($"Error in {modelStateKey}: {error.ErrorMessage}");
                    }
                }
                return BadRequest(ModelState);
            }

            var nuovoCliente = new Cliente
            {
                Nome = dto.Nome,
                Cognome = dto.Cognome,
                Email = dto.Email,
                Telefono = dto.Telefono,
                DettagliAggiuntivi = null,
                Attivo = true,
                Cancellato = false,
                FkIdUserCliente = null
            };

            _context.Clienti.Add(nuovoCliente);
            await _context.SaveChangesAsync();

            var nuovaValutazione = new RichiestaValutazione
            {
                FkIdCliente = nuovoCliente.IdCliente,
                Indirizzo = dto.Indirizzo,
                CamereDaLetto = dto.CamereDaLetto,
                Bagni = dto.Bagni,
                Cucina = dto.Cucina,
                Sala = dto.Sala,
                AltriVani = dto.AltriVani,
                Metratura = dto.Metratura,
                Box = dto.Box,
                PostiAuto = dto.PostiAuto,
                CaratteristicheSpeciali = dto.CaratteristicheSpeciali,
                Attivo = true,
                Cancellato = false
            };

            _context.RichiesteValutazione.Add(nuovaValutazione);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Richiesta di valutazione inviata con successo" }); ; 
        }
    }
}
