using Core.Base.Dto;
using Core.Base.Repos;
using Core.Identity.Dto;
using Core.Identity.Entities;
using System.Collections.Generic;

namespace Core.Identity.Repos
{
    public interface IUserRepo : IRepo<User>
    {
        void ConfirmPhone(User user);

        bool IsUsernameAvailable(string Username);

        User ReadByPhone(string phone);

        User ReadByUsername(string UserName);

        List<Role> ReadUserAllRoles(User User);

        bool UserWithPhoneExist(string Phone);
        void UpdateProfile(User user);
        PagedListDto<UserListDto> Search(PageRequestDto<UserListFilterDto> dto);
    }
}
