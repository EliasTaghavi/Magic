﻿using Core.Base.Dto;
using Core.Base.Entities;
using Core.Identity.Dto;
using Core.Identity.Entities;
using Microsoft.Extensions.Primitives;

namespace Core.Identity.Managers
{
    public interface IUserManager
    {
        ManagerResult<bool> Create(User User, string Password);

        ManagerResult<AccessToken> SignIn(string Username, string Password, string Ip);

        ManagerResult<bool> SignOut(string Username, AccessToken AccessToken);

        ManagerResult<bool> SignOut(StringValues header);

        ManagerResult<bool> SignUp(User User, string Password);
        ManagerResult<User> GetProfileDetails(string userId);
        ManagerResult<bool> Update(User user);
        ManagerResult<bool> CreateByPhone(CreateUserDto dto);
        ManagerResult<bool> FillUserData(UserFillDataDto dto, string userId);
        ManagerResult<PagedListDto<UserListDto>> Search(PageRequestDto<UserListFilterDto> dto);
    }
}
