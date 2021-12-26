using Core.Base.Entities;
using Core.Identity.Dto;
using Core.Identity.Entities;
using Core.Identity.Interfaces;
using Core.Identity.Managers;
using Core.Identity.Mappers;
using Core.Identity.Repos;
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
        protected ITokenRepo TokenRepo;

        protected IUserRepo UserRepo;

        public UserManager(IUserRepo userRepo,
                           IJwtTokenHandler jwtTokenHandler,
                           IPasswordHandler passwordHandler,
                           ITokenRepo tokenRepo,
                           ITokenManager tokenManager,
                           IRoleRepo roleRepo)
        {
            UserRepo = userRepo;
            JwtTokenHandler = jwtTokenHandler;
            PasswordHandler = passwordHandler;
            TokenRepo = tokenRepo;
            TokenManager = tokenManager;
            RoleRepo = roleRepo;
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

            if (!UserRepo.GetSet().Any(x => x.Phone == User.Phone))
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

        public ManagerResult<bool> CreateByPhone(CreateUserDto dto)
        {
            try
            {
                User model = dto.ToModel();
                User mangerResult = UserRepo.Create(model);
                return new ManagerResult<bool>(true);
            }
            catch (Exception ex)
            {
                return new ManagerResult<bool>(false)
                {
                    Success = false,
                    Errors = new List<string>() { ex.Message },
                };
            }
        }
    }
}
