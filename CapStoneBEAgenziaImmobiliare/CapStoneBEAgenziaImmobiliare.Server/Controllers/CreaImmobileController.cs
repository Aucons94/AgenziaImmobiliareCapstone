using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using CapStoneBEAgenziaImmobiliare.Server.Models;

namespace CapStoneBEAgenziaImmobiliare.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class CreaImmobileController : ControllerBase
{
    private readonly AgenziaImmobiliareContext _context;

    public CreaImmobileController(AgenziaImmobiliareContext context)
    {
        _context = context;
    }

    public class ImmobileCreateDto
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
        public string? CaratteristicheSpeciali { get; set; }
        public bool Vetrina { get; set; }
        public bool Pubblicata { get; set; }
        public bool Locazione { get; set; }
        public int? FkIdUser { get; set; }
        public List<IFormFile>? ImmaginiCasa { get; set; }
    }

    [HttpPost]
    [Authorize(Roles = "Master Broker, Coordinatrice")]
    public async Task<IActionResult> CreateImmobile([FromForm] ImmobileCreateDto immobileCreateDto)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var immobile = new Immobile
        {
            Titolo = immobileCreateDto.Titolo,
            Descrizione = immobileCreateDto.Descrizione,
            Prezzo = immobileCreateDto.Prezzo,
            TipoProprietà = immobileCreateDto.TipoProprietà,
            Comune = immobileCreateDto.Comune,
            Indirizzo = immobileCreateDto.Indirizzo,
            CamereDaLetto = immobileCreateDto.CamereDaLetto,
            Bagni = immobileCreateDto.Bagni,
            Cucina = immobileCreateDto.Cucina,
            Sala = immobileCreateDto.Sala,
            AltriVani = immobileCreateDto.AltriVani,
            Metratura = immobileCreateDto.Metratura,
            Box = immobileCreateDto.Box,
            PostiAuto = immobileCreateDto.PostiAuto,
            CaratteristicheSpeciali = immobileCreateDto.CaratteristicheSpeciali,
            Vetrina = immobileCreateDto.Vetrina,
            Pubblicata = immobileCreateDto.Pubblicata,
            Locazione = immobileCreateDto.Locazione,
            FkIdUser = immobileCreateDto.FkIdUser
        };

        _context.Immobili.Add(immobile);
        await _context.SaveChangesAsync();

        if (immobileCreateDto.ImmaginiCasa != null && immobileCreateDto.ImmaginiCasa.Count > 0)
        {
            foreach (var file in immobileCreateDto.ImmaginiCasa)
            {
                if (file.Length > 0)
                {

                    string basePath = @"C:\Users\Alessandro\Desktop\Capstone\AgenziaImmobiliare\CapStoneBEAgenziaImmobiliare\CapStoneBEAgenziaImmobiliare.Server\";
                    var filePath = Path.Combine(basePath, "images", "immobili", file.FileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    var immagine = new ImmagineCasa
                    {
                        FkIdImmobile = immobile.IdImmobile,
                        Immagine = filePath
                    };
                    _context.ImmaginiCase.Add(immagine);
                }
            }
            await _context.SaveChangesAsync();
        }

        return Ok(new { message = "Immobile creato con successo." });
    }
}
