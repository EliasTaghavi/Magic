using Core.Identity.Dto;
using Core.Identity.Entities;

namespace Core.Identity.Mappers
{
    public static class UserMapper
    {
        public static User ToModel(this CreateUserDto dto)
        {
            return new User
            {
                Phone = dto.Phone,
                FirstName = dto.FirstName,
                LastName = dto.Lastname,
            };
        }
    }
}
