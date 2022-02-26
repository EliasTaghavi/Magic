using Core.Base.Entities;
using Core.Base.Settings;
using Core.Identity.Dto;
using Core.Identity.Entities;
using Core.Identity.Enums;
using Core.Identity.Interfaces;
using Core.Identity.Managers;
using Core.Identity.Repos;
using Core.Services;
using Core.Shops.Dto;
using Core.Shops.Repos;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;

namespace Infrastructure.Identity.Managers
{
    public class SessionManager : ISessionManager
    {

        private readonly ICacheRepo CacheRepo;

        private readonly ICodeRepo CodeRepo;

        private readonly IPasswordHandler PasswordHandler;

        private readonly SMSSettings settings;

        private readonly ISMSService SMSService;
        private readonly IShopRepo shopRepo;
        private readonly IJwtTokenHandler TokenHandler;

        private readonly ITokenManager TokenManager;

        private readonly ITokenRepo TokenRepo;

        private readonly IUserRepo UserRepo;
        private readonly IRoleRepo roleRepo;

        public SessionManager(IUserRepo userRepo,
                              IRoleRepo roleRepo,
                              ITokenRepo tokenRepo,
                              IPasswordHandler passwordHandler,
                              IJwtTokenHandler tokenHandler,
                              ICodeRepo codeRepo,
                              ITokenManager tokenManager,
                              ICacheRepo cacheRepo,
                              ISMSService sMSService,
                              IShopRepo shopRepo,
                              IOptionsMonitor<SMSSettings> options)
        {
            UserRepo = userRepo;
            this.roleRepo = roleRepo;
            TokenRepo = tokenRepo;
            PasswordHandler = passwordHandler;
            TokenHandler = tokenHandler;
            CodeRepo = codeRepo;
            TokenManager = tokenManager;
            CacheRepo = cacheRepo;
            SMSService = sMSService;
            this.shopRepo = shopRepo;
            settings = options.CurrentValue;
        }

        public ManagerResult<AccessToken> CreateByUP(UPSessionCreateDto dto)
        {
            User user = UserRepo.ReadByUsername(dto.Username);
            byte[] hash = user.PasswordHash;
            byte[] salt = user.PasswordSalt;
            bool flag = PasswordHandler.VerifyPasswordHash(dto.Password, hash, salt);
            if (flag)
            {
                return CreateToken(user, dto.Ip);
            }
            return new ManagerResult<AccessToken>()
            {
                Code = 11,
                Message = "UsernameOrPasswordIsWrong.",
                Success = false
            };
        }

        public ManagerResult<VerifiedUserWithShopDto> CreateByUPShop(UPSessionCreateDto dto)
        {
            User user = UserRepo.ReadByUsername(dto.Username);
            byte[] hash = user.PasswordHash;
            byte[] salt = user.PasswordSalt;
            bool flag = PasswordHandler.VerifyPasswordHash(dto.Password, hash, salt);
            if (flag)
            {
                var token = CreateToken(user, dto.Ip);
                var roles = roleRepo.GetSet().Where(x => x.Users.Any(y => y.Id == user.Id));
                var shop = shopRepo.ReadByUserId(user.Id);
                if (shop == null)
                {
                    return new ManagerResult<VerifiedUserWithShopDto>
                    {
                        Code = 22,
                        Errors = null,
                        Message = "NoShop",
                        Success = false,
                        Result = null
                    };
                }

                var resultDto = new VerifiedUserWithShopDto
                {
                    Address = user.Address,
                    Birthday = user.Birthday,
                    FirstName = user.Name,
                    LastName = user.Surname,
                    Mobile = user.Mobile,
                    ShopkeeperId = user.Id,
                    Shop = new ShopDto
                    {
                        Address = shop.Address,
                        Name = shop.Name,
                        Phone = shop.Phone,
                        PhotoUrl = shop?.Photos?.Where(x => x.Type == Core.File.Enums.FileType.Shop).Select(x => x.FullName).ToList(),
                        ShopLogoUrl = shop?.Photos?.FirstOrDefault(x => x.Type == Core.File.Enums.FileType.ShopId)?.FullName
                    },
                    Status = UserStatus.Confirmed,
                    Token = token.Result.JWT
                };
                return new ManagerResult<VerifiedUserWithShopDto>(resultDto);
            }
            return new ManagerResult<VerifiedUserWithShopDto>()
            {
                Code = 11,
                Message = "UsernameOrPasswordIsWrong.",
                Success = false
            };
        }

        public ManagerResult<bool> Delete(StringValues authHeader)
        {
            try
            {
                string jwt = TokenManager.GetCurrent(authHeader).Result;
                TokenRepo.Disable(jwt);
                CacheRepo.Create(jwt);
                return new ManagerResult<bool>(true);
            }
            catch (Exception)
            {
                return new ManagerResult<bool>(false, false);
            }
        }

        public ManagerResult<bool> RequsetSessionByPhone(string phone)
        {
            User user = UserRepo.ReadByPhone(phone);
            bool userAlreadyExist;
            if (user == null)
            {
                var newUser = new User
                {
                    Mobile = phone,
                    Username = phone,
                    UserStatus = UserStatus.New,
                };
                var role = roleRepo.GetSet().FirstOrDefault(x => x.EnName == "User");
                newUser.Roles.Add(role);
                user = UserRepo.Create(newUser);
            }
            userAlreadyExist = string.IsNullOrEmpty(user.Name?.Trim());
            Code code = CodeRepo.ReadByUserId(user.Id, TokenType.SMS);
            if (code != null)
            {
                if ((DateTime.UtcNow - code.CreatedDate) > TimeSpan.FromMinutes(1) && code.Times == 1)
                {
                    SMSService.Verification($"{code.Num}", user.Mobile).Wait();
                    code.Times = 2;
                    CodeRepo.Update(code);
                }
                if (code.Times == 2 && settings.CallSupport)
                {
                    return new ManagerResult<bool>
                    {
                        Message = "Call Support.",
                        Result = true,
                        Success = true,
                        Code = 5
                    };
                }
                return new ManagerResult<bool>
                {
                    Code = 3,
                    Message = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development" ? $"SMS Sent.{code.Num}" : "SMS Sent.",
                    Success = true,
                    Result = true
                };
            }
            Random random = new();
            int num = random.Next(1000, 10000);
            Code newCode = new()
            {
                CreatedDate = DateTime.UtcNow,
                Num = num,
                Type = TokenType.SMS,
                UserId = user.Id,
                Times = 1
            };
            CodeRepo.Create(newCode);
            SMSService.Verification($"{num}", user.Mobile).Wait();
            return new ManagerResult<bool>
            {
                Code = userAlreadyExist ? 1 : 2,
                Message = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development" ? $"SMS Sent.{num}" : "SMS Sent.",
                Success = true,
                Result = true
            };
        }

        public ManagerResult<AccessToken> VerifyTokenByPhone(VerifyTokenPhoneDto dto)
        {
            User user = UserRepo.ReadByPhone(dto.Phone);
            if (user != null)
            {
                Code code = CodeRepo.ReadByUserId(user.Id, TokenType.SMS);
                if (code != null)
                {
                    if (code.Num == dto.Token)
                    {
                        if (!user.MobileConfirmed)
                        {
                            UserRepo.ConfirmPhone(user);
                        }
                        ManagerResult<AccessToken> token = CreateToken(user, dto.IP);
                        CodeRepo.Remove(code);
                        if (user.UserStatus == UserStatus.New)
                        {
                            return new ManagerResult<AccessToken>(token.Result, true)
                            {
                                Message = "Welcome! Fill the form",
                                Code = 14
                            };
                        }
                        if (user.UserStatus == UserStatus.NotConfirmed)
                        {
                            return new ManagerResult<AccessToken>(token.Result, true)
                            {
                                Message = "Welcome! Admin didn't comfirm yor account.",
                                Code = 15
                            };
                        }
                        return new ManagerResult<AccessToken>(token.Result, true)
                        {
                            Message = "Welcome",
                            Code = 10
                        };
                    }
                    return new ManagerResult<AccessToken>()
                    {
                        Code = 8,
                        Message = "CodeIsNotCorrect.",
                        Success = false
                    };
                }
                return new ManagerResult<AccessToken>()
                {
                    Code = 7,
                    Message = "NoCodeForThisUser.",
                    Success = false
                };
            }
            else
            {
                return new ManagerResult<AccessToken>()
                {
                    Code = 6,
                    Message = "NoUserWithThisPhoneNumber.",
                    Success = false
                };
            }
        }

        private ManagerResult<AccessToken> CreateToken(User user, string ip)
        {
            string userId = user.Id;
            List<string> roles = UserRepo.ReadUserAllRoles(user).Select(x => x.EnName).ToList();
            AccessToken access = new()
            {
                Enable = true,
                JWT = TokenHandler.GenerateJWTToken(userId, roles, ip),
                RefreshToken = TokenHandler.GenerateRefreshToken(),
                UserId = userId,
                Ip = ip,
                CreatedDate = DateTime.UtcNow
            };
            TokenRepo.Create(access);

            return new ManagerResult<AccessToken>
            {
                Code = 10,
                Message = "Welcome.",
                Result = access,
                Success = true
            };
        }
    }
}
