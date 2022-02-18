﻿using Core.Base.Dto;
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
using Core.Packs.Repos;
using Core.Services;
using Core.Services.Dto;
using Core.Shops.Dto;
using Core.Shops.Repos;
using Infrastructure.Identity.Exceptions;
using Microsoft.Extensions.Primitives;

namespace Infrastructure.Identity.Managers
{
    public class UserManager : IUserManager
    {
        protected IJwtTokenHandler JwtTokenHandler;

        protected IPasswordHandler PasswordHandler;

        protected ITokenManager TokenManager;
        private readonly IRoleRepo RoleRepo;
        private readonly IPackBuyRepo packBuyRepo;
        private readonly IAppFileRepo appFileRepo;
        private readonly ISMSService sMSService;
        private readonly IShopRepo shopRepo;
        protected ITokenRepo TokenRepo;

        protected IUserRepo UserRepo;
        private readonly IUserTypeRepo userTypeRepo;

        public UserManager(IUserRepo userRepo,
            IUserTypeRepo userTypeRepo,
                           IJwtTokenHandler jwtTokenHandler,
                           IPasswordHandler passwordHandler,
                           ITokenRepo tokenRepo,
                           ITokenManager tokenManager,
                           IRoleRepo roleRepo,
                           IPackBuyRepo packBuyRepo,
                           IAppFileRepo appFileRepo, ISMSService sMSService, IShopRepo shopRepo)
        {
            UserRepo = userRepo;
            this.userTypeRepo = userTypeRepo;
            JwtTokenHandler = jwtTokenHandler;
            PasswordHandler = passwordHandler;
            TokenRepo = tokenRepo;
            TokenManager = tokenManager;
            RoleRepo = roleRepo;
            this.packBuyRepo = packBuyRepo;
            this.appFileRepo = appFileRepo;
            this.sMSService = sMSService;
            this.shopRepo = shopRepo;
        }

        public ManagerResult<bool> Create(User User, string Password)
        {
            PasswordHashResult pass = PasswordHandler.CreatePasswordHash(Password);
            User.PasswordHash = pass.PasswordHash;
            User.PasswordSalt = pass.PasswordSalt;
            Role userrole = RoleRepo.GetSet().First(x => x.EnName == "User");
            User.Roles.Add(userrole);
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

        public ManagerResult<User> CreateByPhone(CreateUserDto dto, string roleName = default)
        {
            User model = dto.ToModel();
            Role role = RoleRepo.GetByName(roleName);
            if (role != null)
            {
                model.Roles.Add(role);
            }

            User mangerResult = UserRepo.Create(model);
            return new ManagerResult<User>(mangerResult);
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
            user.QRCode = Guid.NewGuid().ToString();
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
                item.SelfieURL = photos.FirstOrDefault(x => x.RefId == item.Id && x.Type == FileType.Selfie)?.FullName;
                item.IdentityURL = photos.FirstOrDefault(x => x.RefId == item.Id && x.Type == FileType.Identity)?.FullName;
            }
            return new ManagerResult<PagedListDto<UserListDto>>(result);
        }

        public ManagerResult<bool> Confirm(ConfirmUserDto dto)
        {
            var user = UserRepo.Read(dto.UserId);
            user.UserStatus = UserStatus.Confirmed;
            user.UserTypeId = dto.TypeId;
            UserRepo.Update(user);
            sMSService.SendConfirm(user.Mobile, $"{user.Name} {user.Surname}");
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
            UserRepo.Delete(user.Id);
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

        public ManagerResult<List<ShopRefCodeCountDto>> GetRank()
        {
            var refCountList = UserRepo.GetSet().GroupBy(x => x.RefCode)
                .Select(g => new { refCode = g.Key, count = g.Count() });
            var result = refCountList.Join(shopRepo.GetSet(),
                refCount => refCount.refCode,
                shop => shop.ReferralCode,
                (refCount, shop) => new
                {
                    shop.Name,
                    refCount.count
                }).Select(x => new ShopRefCodeCountDto { Count = x.count, Name = x.Name }).ToList();
            return new ManagerResult<List<ShopRefCodeCountDto>>(result);
        }

        public ManagerResult<List<KeyValueDto<string, string>>> GetTypes()
        {
            var result = userTypeRepo.GetTypes();
            return new ManagerResult<List<KeyValueDto<string, string>>>(result);
        }

        public ManagerResult<BuyerDto> GetBuyer(ShopBuyerDto dto)
        {
            var buyer = UserRepo.ReadByQR(dto.UserId);
            var shop = shopRepo.ReadByUserId(dto.ShoperId);
            if (shop != null && buyer != null)
            {
                var selfie = appFileRepo.GetSet().FirstOrDefault(x => x.RefId == buyer.Id && x.Type == FileType.Selfie);
                var packBuy = packBuyRepo.GetCurrentByUserId(buyer.Id);
                if (packBuy == null)
                {
                    return new ManagerResult<BuyerDto>(null,false);
                }
                var resultDto = new BuyerDto
                {
                    DayRemain = (packBuy.PayDate.Value.AddDays(packBuy.Pack.DayCount) - DateTime.UtcNow).Days,
                    ExpireDate = packBuy.PayDate.Value.AddDays(packBuy.Pack.DayCount),
                    Lastname = buyer.Surname,
                    Name = buyer.Name,
                    PackStatus = packBuy.PayStatus.Value,
                    SelfieUrl = selfie?.FullName,
                    UserType = buyer.UserType.Name,
                    ShopOff = shop.Offs?.FirstOrDefault()?.Percentage ?? 0,
                };
                return new ManagerResult<BuyerDto>(resultDto);
            }
            return new ManagerResult<BuyerDto>(null, false);
        }

        public ManagerResult<string> GetQR(string userId)
        {
            var result = UserRepo.Read(userId);
            if (result == null)
            {
                return new ManagerResult<string>(null, false);
            }
            return new ManagerResult<string>(result.QRCode);
        }
    }
}
