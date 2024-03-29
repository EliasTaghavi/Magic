﻿using Core.Identity.Dto;
using Core.Identity.Entities;

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
                UserStatus = dto.Status,
                Username = dto.Phone
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
                CreatedDate = user.CreatedDate,
                TypeId = user.UserTypeId,
                Roles = user.Roles?.Select(x => x.Name)?.ToList(),
            };
        }

        public static List<UserListDto> ToDto(this List<User> users)
        {
            return users.Select(x => x.ToDto()).ToList();
        }
    }
}
