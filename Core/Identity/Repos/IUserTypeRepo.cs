﻿using Core.Base.Dto;
using Core.Base.Repos;
using Core.Identity.Entities;

namespace Core.Identity.Repos
{
    public interface IUserTypeRepo : IRepo<UserType>
    {
        List<KeyValueDto<string, string>> GetTypes();
    }
}
