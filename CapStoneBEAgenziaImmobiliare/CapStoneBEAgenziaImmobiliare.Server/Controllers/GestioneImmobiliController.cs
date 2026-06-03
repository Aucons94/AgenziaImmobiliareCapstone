using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace CapStoneBEAgenziaImmobiliare.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class GestioneImmobiliController : ControllerBase
    {
        private readonly IImmobileService _immobileService;
        private readonly ILogger<GestioneImmobiliController> _logger;
        private readonly string _basePath;

        public GestioneImmobiliController(IImmobileService immobileService, ILogger<GestioneImmobiliController> logger, IWebHostEnvironment env)
        {
            _immobileService = immobileService;
            _logger = logger;
            _basePath = Path.Combine(env.ContentRootPath, "images", "immobili");
        }

        [HttpGet]
        public async Task<IActionResult> GetImmobili()
        {
            try
            {
                var baseUrl = $"{Request.Scheme}://{Request.Host}/images/immobili/";
                var isMasterOrCoordinator = User.IsInRole("Master Broker") || User.IsInRole("Coordinatrice");
                int? userId = null;

                if (!isMasterOrCoordinator)
                {
                    if (int.TryParse(User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value, out var parsedUserId))
                    {
                        userId = parsedUserId;
                    }
                    else
                    {
                        _logger.LogError("UserId claim is missing or not an integer");
                        return Unauthorized("UserId claim is missing or not an integer");
                    }
                }

                var immobili = await _immobileService.GetAllImmobiliAsync(userId, isMasterOrCoordinator, baseUrl);
                return Ok(immobili);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while fetching properties.");
                return StatusCode(500, "An internal error occurred.");
            }
        }



        [HttpDelete("{id}")]
        [Authorize(Roles = "Master Broker, Coordinatrice")]
        public async Task<IActionResult> DeleteImmobile(int id)
        {
            try
            {
                var result = await _immobileService.DeleteImmobileAsync(id);
                if (!result)
                {
                    return NotFound("Immobile non trovato.");
                }

                return Ok("Immobile cancellato con successo.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante la cancellazione dell'immobile.");
                return StatusCode(500, "Errore durante la cancellazione dell'immobile.");
            }
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "Master Broker, Coordinatrice")]
        public async Task<IActionResult> ModificaImmobile(int id, [FromBody] ImmobileDto immobileDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var isMasterBroker = User.IsInRole("Master Broker");
                var result = await _immobileService.UpdateImmobileAsync(id, immobileDto, isMasterBroker);
                
                if (result == null)
                {
                    return NotFound("Immobile non trovato.");
                }

                return Ok(new { Message = "Immobile modificato con successo." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante la modifica dell'immobile.");
                return StatusCode(500, "Errore durante la modifica dell'immobile.");
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetImmobile(int id)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}/images/immobili/";
            var immobile = await _immobileService.GetImmobileByIdAsync(id, baseUrl);

            if (immobile == null)
            {
                return NotFound();
            }

            return Ok(immobile);
        }


        [HttpGet("staff")]
        [Authorize(Roles = "Master Broker, Coordinatrice")]
        public async Task<IActionResult> GetStaffMembers()
        {
            try
            {
                var staffMembers = await _immobileService.GetStaffMembersAsync();
                return Ok(staffMembers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while fetching staff members.");
                return StatusCode(500, "Internal server error while fetching staff members.");
            }
        }

        [HttpPost("{idImmobile}/upload")]
        [Authorize(Roles = "Master Broker, Coordinatrice")]
        public async Task<IActionResult> UploadImage(int idImmobile, IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            try
            {
                var idImmagine = await _immobileService.UploadImageAsync(idImmobile, file, _basePath);
                return Ok(new { IdImmagine = idImmagine });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading image.");
                return StatusCode(500, "Error uploading image.");
            }
        }


        [HttpPost("setCopertina/{idImmagine}")]
        [Authorize(Roles = "Master Broker, Coordinatrice")]
        public async Task<IActionResult> SetAsCover(int idImmagine)
        {
            var result = await _immobileService.SetCoverImageAsync(idImmagine);
            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpDelete("{idImmobile}/images/{idImmagine}")]
        [Authorize(Roles = "Master Broker, Coordinatrice")]
        public async Task<IActionResult> DeleteImage(int idImmobile, int idImmagine)
        {
            try
            {
                var result = await _immobileService.DeleteImageAsync(idImmobile, idImmagine, _basePath);
                if (!result)
                {
                    return NotFound("Immagine non trovata.");
                }

                return Ok("Immagine rimossa con successo.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Errore durante la cancellazione dell'immagine.");
                return StatusCode(500, "Errore interno del server.");
            }
        }

    }
}
