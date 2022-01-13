using Core.Base.Dto;
using Core.Base.Entities;
using Core.File.Repos;
using Core.Identity.Dto;
using Core.Identity.Managers;
using Core.Services;
using Core.Shop.Dto;
using Core.Shop.Managers;
using Core.Shop.Mappers;
using Core.Shop.Repos;
using System;
using System.Linq;

namespace Infrastructure.Shop.Managers
{
    public class ShopManager : IShopManager
    {
        private readonly IShopRepo shopRepo;
        private readonly IUserManager userManager;
        private readonly IAppFileRepo appFileRepo;
        private readonly IFileService fileService;
        private readonly ISessionManager sessionManager;

        public ShopManager(IShopRepo shopRepo, IUserManager userManager, IAppFileRepo appFileRepo, IFileService fileService, ISessionManager sessionManager)
        {
            this.shopRepo = shopRepo;
            this.userManager = userManager;
            this.appFileRepo = appFileRepo;
            this.fileService = fileService;
            this.sessionManager = sessionManager;
        }

        public ManagerResult<bool> AddPhotos(AddPhotosForShopDto dto)
        {
            throw new NotImplementedException();
        }

        public ManagerResult<bool> Create(CreateShopDto dto)
        {
            var userDto = new CreateUserDto
            {
                FirstName = dto.UserName,
                Lastname = dto.UserSurname,
                Phone = dto.UserMobile
            };
            var user = userManager.CreateByPhone(userDto).Result;

            Random random = new();
            var code = random.Next(1000, 10000);

            var shop = dto.ToDataModel();
            shop.UserId = user.Id;
            shop.ReferralCode = code.ToString();
            shopRepo.Create(shop);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<bool> Delete(string id)
        {
            shopRepo.Delete(id);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<string> FindByRef(string refCode)
        {
            var shopName = shopRepo.GetSet().Where(x => x.ReferralCode == refCode).FirstOrDefault()?.Name;
            return new ManagerResult<string>(refCode);
        }

        public ManagerResult<PagedListDto<ShopWithUserDto>> Search(PageRequestDto<ShopListFilterDto> filterDto)
        {
            var result = shopRepo.Search(filterDto);
            var dto = new PagedListDto<ShopWithUserDto>
            {
                Count = result.Count,
                Items = result.Items.ToDto()
            };
            return new ManagerResult<PagedListDto<ShopWithUserDto>>(dto);
        }

        public ManagerResult<VerifiedUserWithShopDto> VerifyTokenByPhoneForShop(VerifyTokenPhoneDto verifyTokenPhoneDto)
        {
            var token = sessionManager.VerifyTokenByPhone(verifyTokenPhoneDto);
            var user = token.Result.User;
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
                Shop = new ShopDto
                {
                    Address = shop.Address,
                    Name = shop.Name,
                    Phone = shop.Phone,
                    PhotoUrl = shop?.Photos?.Where(x => x.Type == Core.File.Enums.FileType.Shop).Select(x => x.FullName).ToList(),
                    ShopLogoUrl = shop?.Photos?.FirstOrDefault(x => x.Type == Core.File.Enums.FileType.ShopLogo)?.FullName
                },
                Status = user.UserStatus,
                Token = token.Result.JWT
            };
            return new ManagerResult<VerifiedUserWithShopDto>(resultDto);
        }
    }
}
