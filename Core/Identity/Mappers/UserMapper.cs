using Core.Identity.Dto;
using Core.Identity.Entities;
using System.Collections.Generic;
using System.Linq;

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

        public static UserListDto ToDto(this User user)
        {
            return new UserListDto
            {
                Confirmed = user.Confirmed,
                FirstName = user.FirstName,
                Id = user.Id,
                IdentityURL = string.Empty,
                LastName = user.LastName,
                Mobile = user.Mobile,
                SelfieURL = string.Empty,
            };
        }

        public static List<UserListDto> ToDto(this List<User> users)
        {
            return users.Select(x => x.ToDto()).ToList();
        }
    }
}
