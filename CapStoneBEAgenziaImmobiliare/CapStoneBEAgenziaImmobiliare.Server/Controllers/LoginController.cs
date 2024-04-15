using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace PortaleBiblioteca.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AgenziaImmobiliareContext _db;

        public AuthController(IConfiguration configuration, AgenziaImmobiliareContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        [HttpPost("token")]
        public IActionResult CreateToken([FromBody] LoginModel formlogin)
        {
            var user = Authenticate(formlogin);

            if (user != null)
            {
                var tokenString = BuildToken(user, _configuration);

                return Ok(
                    new
                    {
                        token = tokenString,
                        User = new
                        {
                            user.Nome,
                            user.Cognome,
                        }
                    }
                );
            }

            return Unauthorized(new { message = "Email o password non validi" });
        }

        private User Authenticate(LoginModel login)
        {
            
            var user = _db.Staff
                .Include(u => u.Ruolo)
                .FirstOrDefault(u => u.Nome == login.NomeCognome && u.Password == login.Password);

            if (user == null)
            {
                return null;
            }

            return new User
            {
                IdUser = user.IdUser,
                Nome = user.Nome,
                Cognome = user.Cognome,
                Telefono = user.Telefono,
                Ruolo = user.Ruolo,
            };
        }
        public static string BuildToken(User user, IConfiguration configuration)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Jti, user.IdUser.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.Nome),
                new Claim(ClaimTypes.Role, user.Ruolo.Role),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    configuration["Jwt:Issuer"],
                    configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

