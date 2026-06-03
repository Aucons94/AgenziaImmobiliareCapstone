using CapStoneBEAgenziaImmobiliare.Server.DTOs.User;
using CapStoneBEAgenziaImmobiliare.Server.Interfaces;
using CapStoneBEAgenziaImmobiliare.Server.Models;
using Microsoft.AspNetCore.Http;

namespace CapStoneBEAgenziaImmobiliare.Server.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRuoloRepository _ruoloRepository;

        public UserService(IUserRepository userRepository, IRuoloRepository ruoloRepository)
        {
            _userRepository = userRepository;
            _ruoloRepository = ruoloRepository;
        }

        public async Task<IEnumerable<UserResponseDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return users.Select(u => new UserResponseDto
            {
                IdUser = u.IdUser,
                Nome = u.Nome,
                Cognome = u.Cognome,
                Ruolo = u.Ruolo.Role
            }).ToList();
        }

        public async Task<UserDetailDto> GetUserByIdAsync(int id, string baseUrl)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return null;

            return new UserDetailDto
            {
                IdUser = user.IdUser,
                Nome = user.Nome,
                Cognome = user.Cognome,
                Telefono = user.Telefono,
                Foto = user.Foto != null ? baseUrl + user.Foto : null,
                Ruolo = user.Ruolo.Role
            };
        }

        public async Task<UserDetailDto> UpdateUserAsync(int id, UserDto userDto, IFormFile foto, string staffImagesPath)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return null;

            user.Nome = userDto.Nome ?? user.Nome;
            user.Cognome = userDto.Cognome ?? user.Cognome;
            user.Telefono = userDto.Telefono ?? user.Telefono;

            if (userDto.FkIdRuolo.HasValue)
            {
                user.FkIdRuolo = userDto.FkIdRuolo.Value;
            }

            if (foto != null)
            {
                if (!string.IsNullOrEmpty(user.Foto))
                {
                    var oldFilePath = Path.Combine(staffImagesPath, user.Foto);
                    if (File.Exists(oldFilePath))
                    {
                        File.Delete(oldFilePath);
                    }
                }

                var newFileName = Guid.NewGuid().ToString() + Path.GetExtension(foto.FileName);
                var newFilePath = Path.Combine(staffImagesPath, newFileName);
                using (var stream = new FileStream(newFilePath, FileMode.Create))
                {
                    await foto.CopyToAsync(stream);
                }
                user.Foto = newFileName;
            }

            if (!string.IsNullOrEmpty(userDto.Password))
            {
                user.Password = userDto.Password;
            }

            await _userRepository.UpdateAsync(user);

            return new UserDetailDto
            {
                IdUser = user.IdUser,
                Nome = user.Nome,
                Cognome = user.Cognome,
                Telefono = user.Telefono,
                Foto = user.Foto,
                Ruolo = user.Ruolo?.Role
            };
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            return await _userRepository.SoftDeleteAsync(id);
        }

        public async Task<IEnumerable<Ruolo>> GetRuoliAsync()
        {
            return await _ruoloRepository.GetAllAsync();
        }

        public async Task<User> CreateUserAsync(UserDto userDto, IFormFile foto, string staffImagesPath)
        {
            var user = new User
            {
                Nome = userDto.Nome,
                Cognome = userDto.Cognome,
                Telefono = userDto.Telefono,
                FkIdRuolo = userDto.FkIdRuolo ?? 0,
                Password = userDto.Password
            };

            if (foto != null)
            {
                var fileName = Path.GetFileNameWithoutExtension(foto.FileName);
                var extension = Path.GetExtension(foto.FileName);
                var fileModel = $"{fileName}_{DateTime.Now:yyyyMMddHHmmss}{extension}";
                var filePath = Path.Combine(staffImagesPath, fileModel);

                if (!Directory.Exists(staffImagesPath))
                {
                    Directory.CreateDirectory(staffImagesPath);
                }

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await foto.CopyToAsync(stream);
                }
                user.Foto = fileModel;
            }

            return await _userRepository.CreateAsync(user);
        }
    }
}
