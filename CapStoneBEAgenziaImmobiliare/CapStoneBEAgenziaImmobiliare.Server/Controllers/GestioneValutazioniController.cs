using CapStoneBEAgenziaImmobiliare.Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;



[Authorize]
[Route("[controller]")]
[ApiController]
public class GestioneValutazioniController : ControllerBase
{
    private readonly IValutazioneService _valutazioneService;

    public GestioneValutazioniController(IValutazioneService valutazioneService)
    {
        _valutazioneService = valutazioneService;
    }

    [HttpGet]
    public async Task<ActionResult> GetValutazioni()
    {
        var valutazioni = await _valutazioneService.GetAllValutazioniAsync();
        return Ok(valutazioni);
    }



    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteValutazione(int id)
    {
        var result = await _valutazioneService.DeleteValutazioneAsync(id);

        if (!result)
        {
            return NotFound();
        }

        return Ok("Valutazione cancellata con successo.");
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<dynamic>> GetValutazioneDettagli(int id)
    {
        var valutazione = await _valutazioneService.GetValutazioneByIdAsync(id);

        if (valutazione == null)
        {
            return NotFound();
        }

        return valutazione;
    }

    [HttpPut("{id}/attivo")]
    public async Task<IActionResult> ToggleActive(int id)
    {
        var result = await _valutazioneService.ToggleActiveAsync(id);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

}
