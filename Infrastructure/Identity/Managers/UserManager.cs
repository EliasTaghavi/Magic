using Core.Base.Dto;
using Core.Base.Entities;
using Core.Base.Enums;
using Core.File.Enums;
using Core.File.Repos;
using Core.Identity.Dto;
using Core.Identity.Entities;
using Core.Identity.Enums;
using Core.Identity.Interfaces;
using Core.Identity.Managers;
using Core.Identity.Mappers;
using Core.Identity.Repos;
using Core.Services;
using Core.Services.Dto;
using Infrastructure.Identity.Exceptions;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure.Identity.Managers
{
    public class UserManager : IUserManager
    {
        protected IJwtTokenHandler JwtTokenHandler;

        protected IPasswordHandler PasswordHandler;

        protected ITokenManager TokenManager;
        private readonly IRoleRepo RoleRepo;
        private readonly IAppFileRepo appFileRepo;
        private readonly ISMSService sMSService;
        protected ITokenRepo TokenRepo;

        protected IUserRepo UserRepo;

        public UserManager(IUserRepo userRepo,
                           IJwtTokenHandler jwtTokenHandler,
                           IPasswordHandler passwordHandler,
                           ITokenRepo tokenRepo,
                           ITokenManager tokenManager,
                           IRoleRepo roleRepo,
                           IAppFileRepo appFileRepo, ISMSService sMSService)
        {
            UserRepo = userRepo;
            JwtTokenHandler = jwtTokenHandler;
            PasswordHandler = passwordHandler;
            TokenRepo = tokenRepo;
            TokenManager = tokenManager;
            RoleRepo = roleRepo;
            this.appFileRepo = appFileRepo;
            this.sMSService = sMSService;
        }

        public ManagerResult<bool> Create(User User, string Password)
        {
            PasswordHashResult pass = PasswordHandler.CreatePasswordHash(Password);
            User.PasswordHash = pass.PasswordHash;
            User.PasswordSalt = pass.PasswordSalt;
            Role userrole = RoleRepo.GetSet().First(x => x.EnName == "User");
            User.UserRoles.Add(new UserRole()
            {
                User = User,
                CreatedDate = DateTime.UtcNow,
                Enable = true,
                Role = userrole,
                RoleId = userrole.Id,
                UserId = User.Id
            });
            if (User.Email != null)
            {
                if (UserRepo.GetSet().Any(x => x.Email == User.Email))
                {
                    throw new EmailExistException();
                }
            }

            if (!UserRepo.GetSet().Any(x => x.Mobile == User.Mobile))
            {
                UserRepo.Create(User);
            }
            else
            {
                throw new PhoneExistException();
            }
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<AccessToken> SignIn(string Username, string Password, string Ip)
        {
            User user = UserRepo.ReadByUsername(Username);
            byte[] hash = user.PasswordHash;
            byte[] salt = user.PasswordSalt;
            bool flag = PasswordHandler.VerifyPasswordHash(Password, hash, salt);
            if (flag)
            {
                string userId = user.Id;
                List<string> roles = UserRepo.ReadUserAllRoles(user).Select(x => x.Name).ToList();
                AccessToken access = new()
                {
                    Enable = true,
                    //JWT = JwtTokenHandler.GenerateJWTToken(userId, roles),
                    RefreshToken = JwtTokenHandler.GenerateRefreshToken(),
                    UserId = userId,
                    Ip = Ip
                };
                TokenRepo.Create(access);
                return new ManagerResult<AccessToken>(access);
            }
            return null;
        }

        public ManagerResult<bool> SignOut(string Username, AccessToken AccessToken)
        {
            throw new NotImplementedException();
        }

        public ManagerResult<bool> SignOut(StringValues header)
        {
            string jwt = TokenManager.GetCurrent(header).Result;
            //TODO : Implement SignOut
            return new ManagerResult<bool>(true, true);
        }

        public ManagerResult<bool> SignUp(User User, string Password)
        {
            PasswordHashResult pass = PasswordHandler.CreatePasswordHash(Password);
            User.PasswordHash = pass.PasswordHash;
            User.PasswordSalt = pass.PasswordSalt;
            UserRepo.Create(User);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<bool> Update(User user)
        {
            UserRepo.UpdateProfile(user);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<User> GetProfileDetails(string userId)
        {
            throw new NotImplementedException();
        }

        public ManagerResult<User> CreateByPhone(CreateUserDto dto)
        {
            try
            {
                User model = dto.ToModel();
                User mangerResult = UserRepo.Create(model);
                return new ManagerResult<User>(mangerResult);
            }
            catch (Exception ex)
            {
                return new ManagerResult<User>(null)
                {
                    Success = false,
                    Errors = new List<string>() { ex.Message },
                };
            }
        }

        public ManagerResult<bool> FillUserData(UserFillDataDto dto, string userId)
        {
            User user = UserRepo.Read(userId);
            user.Name = dto.FirstName;
            user.Surname = dto.LastName;
            user.Address = dto.Address;
            user.Birthday = dto.Birthday;
            user.RefCode = dto.RefCode;
            user.UserStatus = UserStatus.NotConfirmed;
            UserRepo.Update(user);
            return new ManagerResult<bool>(true)
            {
                Code = 16
            };
        }

        public ManagerResult<PagedListDto<UserListDto>> Search(PageRequestDto<UserListFilterDto> dto)
        {
            var result = UserRepo.Search(dto);
            var userIds = result.Items.Select(x => x.Id);
            var photos = appFileRepo.GetPhotos(userIds);
            foreach (var item in result.Items)
            {
                item.SelfieURL = photos.FirstOrDefault(x => x.UserId == item.Id && x.Type == FileType.Selfie)?.FullName;
                item.IdentityURL = photos.FirstOrDefault(x => x.UserId == item.Id && x.Type == FileType.Identity)?.FullName;
            }
            return new ManagerResult<PagedListDto<UserListDto>>(result);
        }

        public ManagerResult<bool> Confirm(string id)
        {
            var user = UserRepo.Read(id);
            user.UserStatus = UserStatus.Confirmed;
            UserRepo.Update(user);
            sMSService.SendConfirm(user.Mobile);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<bool> Lock(string id)
        {
            var user = UserRepo.Read(id);
            user.UserStatus = user.UserStatus == UserStatus.Locked ? UserStatus.Confirmed : UserStatus.Locked;
            UserRepo.Update(user);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<bool> Reject(RejectMessageDto dto)
        {
            var user = UserRepo.Read(dto.UserId);
            user.UserStatus = UserStatus.Rejected;
            UserRepo.Update(user);
            sMSService.SendReject(user.Mobile, dto.Message);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<PagedListDto<UserListDto>> GetLastFiveNewUser()
        {
            var dto = new PageRequestDto<UserListFilterDto>
            {
                Index = 1,
                MetaData = new UserListFilterDto(),
                Order = SortOrder.ASC,
                Size = 5,
                SortField = "CreatedDate"
            };
            return Search(dto);
        }

        public ManagerResult<Dictionary<string, int>> GetRank()
        {
            throw new NotImplementedException();
        }
    }
}
