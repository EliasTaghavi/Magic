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
                Mobile = dto.Phone,
                Name = dto.FirstName,
                Surname = dto.Lastname,
            };
        }

        public static UserListDto ToDto(this User user)
        {
            return new UserListDto
            {
                Status = user.UserStatus,
                FirstName = user.Name,
                Id = user.Id,
                IdentityURL = string.Empty,
                LastName = user.Surname,
                Mobile = user.Mobile,
                SelfieURL = string.Empty,
                Address = user.Address,
                Birthday = user.Birthday,
            };
        }

        public static List<UserListDto> ToDto(this List<User> users)
        {
            return users.Select(x => x.ToDto()).ToList();
        }
    }
}
