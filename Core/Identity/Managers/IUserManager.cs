﻿using Core.Base.Dto;
using Core.Base.Entities;
using Core.Identity.Dto;
using Core.Identity.Entities;
using Core.Services.Dto;
using Core.Shops.Dto;
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
        ManagerResult<User> CreateByPhone(CreateUserDto dto, string roleName = default);
        ManagerResult<bool> FillUserData(UserFillDataDto dto, string userId);
        ManagerResult<PagedListDto<UserListDto>> Search(PageRequestDto<UserListFilterDto> dto);
        ManagerResult<bool> Confirm(ConfirmUserDto dto);
        ManagerResult<bool> Lock(string id);
        ManagerResult<bool> Reject(RejectMessageDto dto);
        ManagerResult<PagedListDto<UserListDto>> GetLastFiveNewUser();
        ManagerResult<List<ShopRefCodeCountDto>> GetRank();
        ManagerResult<List<KeyValueDto<string, string>>> GetTypes();
        ManagerResult<BuyerDto> GetBuyer(ShopBuyerDto dto);
        ManagerResult<string> GetQR(string userId);
        ManagerResult<bool> ChangePassword(ChangePasswordDto dto);
        ManagerResult<string> CreateExpert(CreateExpertDto dto);
        ManagerResult<bool> Edit(EditUserDto dto);
    }
}
