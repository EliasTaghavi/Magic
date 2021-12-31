using Core.Base.Dto;
using Core.Identity.Dto;
using Core.Identity.Entities;
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
            user.PhoneConfirmed = true;
            user.Enable = true;
            Update(user);
        }

        public bool IsUsernameAvailable(string Username)
        {
            return !GetSet().Any(x => x.Username == Username);
        }

        public User ReadByPhone(string phone)
        {
            return GetSet().FirstOrDefault(x => x.Phone == phone);
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
            if (dto.MetaData.Confirmed.HasValue)
            {
                query = query.Where(x => x.Confirmed == dto.MetaData.Confirmed);
            }
            if (string.IsNullOrEmpty(dto.MetaData.Mobile))
            {
                query = query.Where(x => x.Mobile.Contains(dto.MetaData.Mobile));
            }
            int count = query.Count();
            var result = query.Skip(dto.Index * dto.Size).Take(dto.Size).ToList();
            return new PagedListDto<UserListDto>
            {
                Count = count,
                Items = result.ToDto()
            };
        }

        public void UpdateProfile(User user)
        {
            User old = GetSet().First(x => x.Id == user.Id);
            old.FirstName = user.FirstName;
            old.LastName = user.LastName;
            old.Email = user.Email;
            Update(old);
        }

        public bool UserWithPhoneExist(string Phone)
        {
            return GetSet().Any(x => x.Phone == Phone);
        }
    }
}
