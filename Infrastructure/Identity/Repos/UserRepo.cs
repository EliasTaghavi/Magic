using Core.Base.Dto;
using Core.Base.Enums;
using Core.Identity.Dto;
using Core.Identity.Entities;
using Core.Identity.Enums;
using Core.Identity.Mappers;
using Core.Identity.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure.Identity.Repos
{
    public class UserRepo : Repo<User>, IUserRepo
    {
        public UserRepo(OffDbContext Context) : base(Context)
        {
        }

        public void ConfirmPhone(User user)
        {
            user.MobileConfirmed = true;
            user.Enable = true;
            Update(user);
        }

        public User Create(string phone)
        {
            var user = new User
            {
                FirstLogin = true,
                Mobile = phone,
                Username = phone,
                UserStatus = UserStatus.New,
                ObjectState = ObjectState.Added
            };
            return Create(user);
        }

        public bool IsUsernameAvailable(string Username)
        {
            return !GetSet().Any(x => x.Username == Username);
        }

        public User ReadByPhone(string phone)
        {
            return GetSet().FirstOrDefault(x => x.Mobile == phone);
        }

        public User ReadByUsername(string UserName)
        {
            return GetSet().FirstOrDefault(x => x.Username == UserName);
        }

        public List<Role> ReadUserAllRoles(User User)
        {
            string username = User.Username;
            return GetSet().Where(x => x.Username == username)
                           .Include(x => x.UserRoles)
                           .ThenInclude(y => y.Role)
                           .First().UserRoles
                           .Select(z => z.Role)
                           .ToList();
        }

        public PagedListDto<UserListDto> Search(PageRequestDto<UserListFilterDto> dto)
        {
            var query = GetSet();
            if (dto.MetaData.Status.HasValue)
            {

                query = query.Where(x => x.UserStatus == dto.MetaData.Status.Value);

            }
            if (!string.IsNullOrEmpty(dto.MetaData.Mobile))
            {
                query = query.Where(x => x.Mobile.Contains(dto.MetaData.Mobile));
            }
            int count = query.Count();
            var result = query.Skip((dto.Index - 1) * dto.Size).Take(dto.Size).ToList();
            return new PagedListDto<UserListDto>
            {
                Count = count,
                Items = result.ToDto()
            };
        }

        public void UpdateProfile(User user)
        {
            User old = GetSet().First(x => x.Id == user.Id);
            old.Name = user.Name;
            old.Surname = user.Surname;
            old.Email = user.Email;
            Update(old);
        }

        public bool UserWithPhoneExist(string Phone)
        {
            return GetSet().Any(x => x.Mobile == Phone);
        }
    }
}
