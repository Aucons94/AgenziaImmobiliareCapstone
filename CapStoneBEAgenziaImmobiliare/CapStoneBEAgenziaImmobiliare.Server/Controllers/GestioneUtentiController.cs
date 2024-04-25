using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Humanizer.Localisation;
using Microsoft.Extensions.Hosting.Internal;


[Authorize(Roles = "Master Broker")]
[Route("[controller]")]
[ApiController]
public class GestioneUtentiController : ControllerBase
{
    private readonly AgenziaImmobiliareContext _context;
    private readonly string _staffImagesPath;

    public GestioneUtentiController(AgenziaImmobiliareContext context, IConfiguration configuration)
    {
        _context = context;
        _staffImagesPath = configuration["FilePaths:StaffImages"];
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> FetchGestioneUtenti()
    {
        var users = await _context.Staff
            .Include(u => u.Ruolo)
                                  .Where(u => !u.Cancellato)
                                  .Select(u => new
                                  {
                                      IdUser = u.IdUser,
                                      Nome = u.Nome,
                                      Cognome = u.Cognome,
                                      Ruolo = u.Ruolo.Role,
                                  })
                                  .ToListAsync();
        return Ok(users);
    }


    [HttpPut("{id}/delete")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Staff.FirstOrDefaultAsync(u => u.IdUser == id);
        if (user == null)
        {
            return NotFound();
        }

        user.Cancellato = true;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<dynamic>> GetUtente(int id)
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}/images/staff/";
        var user = await _context.Staff
                                 .Include(u => u.Ruolo)
                                 .Select(u => new
                                 {
                                     IdUser = u.IdUser,
                                     Nome = u.Nome,
                                     Cognome = u.Cognome,
                                     Telefono = u.Telefono,
                                     Foto = u.Foto != null ? baseUrl + u.Foto : null,
                                     Ruolo = u.Ruolo.Role
                                 })
                                 .FirstOrDefaultAsync(u => u.IdUser == id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }

    public class UserDto
    {
        public string Nome { get; set; }
        public string Cognome { get; set; }
        public string Telefono { get; set; }
        public int? FkIdRuolo { get; set; }
        public IFormFile? Foto { get; set; } 
        public string? Password { get; set; }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUtente(int id, [FromForm] UserDto updatedUser)
    {
        var user = await _context.Staff.FirstOrDefaultAsync(u => u.IdUser == id);
        if (user == null)
        {
            return NotFound();
        }

        user.Nome = updatedUser.Nome ?? user.Nome;
        user.Cognome = updatedUser.Cognome ?? user.Cognome;
        user.Telefono = updatedUser.Telefono ?? user.Telefono;
        if (updatedUser.FkIdRuolo.HasValue)
        {
            user.FkIdRuolo = updatedUser.FkIdRuolo.Value;
        }

        if (updatedUser.Foto != null)
        {

            if (!string.IsNullOrEmpty(user.Foto))
            {
                var oldFilePath = Path.Combine(_staffImagesPath, user.Foto);
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
            }


            var newFileName = Guid.NewGuid().ToString() + Path.GetExtension(updatedUser.Foto.FileName); 
            var newFilePath = Path.Combine(_staffImagesPath, newFileName);
            using (var stream = new FileStream(newFilePath, FileMode.Create))
            {
                await updatedUser.Foto.CopyToAsync(stream);
            }
            user.Foto = newFileName; 
        }

        if (!string.IsNullOrEmpty(updatedUser.Password))
        {
            user.Password = updatedUser.Password;
        }

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return Ok(new {message = "Utente aggiornato con successo"});
    }

    private bool UserExists(int id) => _context.Staff.Any(e => e.IdUser == id);



    [HttpGet("Ruoli")]
    public async Task<ActionResult<IEnumerable<Ruolo>>> GetRuoli()
    {
        var ruoli = await _context.Ruoli.ToListAsync();
        if (ruoli == null)
        {
            return NotFound();
        }
        return Ok(ruoli);
    }

    public class UserCreateDto
    {
        public string Nome { get; set; }
        public string Cognome { get; set; }
        public string Telefono { get; set; }
        public int FkIdRuolo { get; set; }
        public IFormFile Foto { get; set; }
        public string Password { get; set; }
    }

    [HttpPost]
    public async Task<IActionResult> CreaUtente([FromForm] UserCreateDto newUser)
    {
        try
        {
            var user = new User
            {
                Nome = newUser.Nome,
                Cognome = newUser.Cognome,
                Telefono = newUser.Telefono,
                FkIdRuolo = newUser.FkIdRuolo,
                Password = newUser.Password 
            };

            if (newUser.Foto != null)
            {
                var staffImagesPath = _staffImagesPath;
                var fileName = Path.GetFileNameWithoutExtension(newUser.Foto.FileName);
                var extension = Path.GetExtension(newUser.Foto.FileName);
                var fileModel = $"{fileName}_{DateTime.Now:yyyyMMddHHmmss}{extension}";
                var filePath = Path.Combine(staffImagesPath, fileModel);

                if (!Directory.Exists(staffImagesPath))
                {
                    Directory.CreateDirectory(staffImagesPath);
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await newUser.Foto.CopyToAsync(stream);
                }
                user.Foto = Path.Combine(fileModel);
            }

            _context.Staff.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Errore interno del server: " + ex.Message);
        }
    }


}
