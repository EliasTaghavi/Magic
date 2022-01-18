using Core.Base.Dto;
using Core.Base.Repos;
using Core.Identity.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Identity.Repos
{
    public interface IUserTypeRepo : IRepo<UserType>
    {
        List<KeyValueDto<string, string>> GetTypes();
    }
}
