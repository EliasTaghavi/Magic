﻿using Core.Base.Dto;
using Core.Identity.Entities;
using Core.Identity.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;

namespace Infrastructure.Identity.Repos
{
    public class UserTypeRepo : Repo<UserType>, IUserTypeRepo
    {
        public UserTypeRepo(OffDbContext offDbContext) : base(offDbContext)
        {

        }

        public List<KeyValueDto<string, string>> GetTypes()
        {
            var types = GetSet()
                .Where(x => x.Enable == true)
                .Select(x => new KeyValueDto<string, string> { Key = x.Id, Value = x.Name })
                .ToList();
            return types;
        }
    }
}
