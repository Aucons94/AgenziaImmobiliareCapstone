using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CapStoneBEAgenziaImmobiliare.Server.Interfaces;
using CapStoneBEAgenziaImmobiliare.Server.DTOs.User;


[Authorize(Roles = "Master Broker")]
[Route("[controller]")]
[ApiController]
public class GestioneUtentiController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly string _staffImagesPath;

    public GestioneUtentiController(IUserService userService, IWebHostEnvironment env)
    {
        _userService = userService;
        _staffImagesPath = Path.Combine(env.ContentRootPath, "images", "staff");
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> FetchGestioneUtenti()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }


    [HttpPut("{id}/delete")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var result = await _userService.DeleteUserAsync(id);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<dynamic>> GetUtente(int id)
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}/images/staff/";
        var user = await _userService.GetUserByIdAsync(id, baseUrl);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUtente(int id, [FromForm] UserDto updatedUser, [FromForm] IFormFile foto)
    {
        try
        {
            var result = await _userService.UpdateUserAsync(id, updatedUser, foto, _staffImagesPath);
            if (result == null)
            {
                return NotFound();
            }

            return Ok(new { message = "Utente aggiornato con successo" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Errore interno del server: " + ex.Message);
        }
    }



    [HttpGet("Ruoli")]
    public async Task<ActionResult> GetRuoli()
    {
        var ruoli = await _userService.GetRuoliAsync();
        if (ruoli == null)
        {
            return NotFound();
        }
        return Ok(ruoli);
    }

    [HttpPost]
    public async Task<IActionResult> CreaUtente([FromForm] UserDto newUser, [FromForm] IFormFile foto)
    {
        try
        {
            var user = await _userService.CreateUserAsync(newUser, foto, _staffImagesPath);
            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Errore interno del server: " + ex.Message);
        }
    }


}
