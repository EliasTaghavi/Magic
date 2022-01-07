using Core.Base.Entities;
using Core.File.Repos;
using Core.Identity.Dto;
using Core.Identity.Managers;
using Core.Services;
using Core.Shop.Dto;
using Core.Shop.Managers;
using Core.Shop.Repos;
using System;
using System.Linq;

namespace Infrastructure.Shop.Managers
{
    public class ShopManager : IShopManager
    {
        private readonly IShopRepo shopRepo;
        private readonly IAppFileRepo appFileRepo;
        private readonly IFileService fileService;
        private readonly ISessionManager sessionManager;

        public ShopManager(IShopRepo shopRepo, IAppFileRepo appFileRepo, IFileService fileService, ISessionManager sessionManager)
        {
            this.shopRepo = shopRepo;
            this.appFileRepo = appFileRepo;
            this.fileService = fileService;
            this.sessionManager = sessionManager;
        }

        public ManagerResult<bool> AddPhotos(AddPhotosForShopDto dto)
        {
            throw new NotImplementedException();
        }

        public ManagerResult<VerifiedUserWithShopDto> VerifyTokenByPhoneForShop(VerifyTokenPhoneDto verifyTokenPhoneDto)
        {
            var token = sessionManager.VerifyTokenByPhone(verifyTokenPhoneDto);
            if (token.Result == null)
            {
                return new ManagerResult<VerifiedUserWithShopDto>
                {
                    Code = token.Code,
                    Errors = token.Errors,
                    Message = token.Message,
                    Success = token.Success,
                    Result = null
                };
            }
            var user = token.Result.User;
            var shop = shopRepo.ReadByUserId(user.Id);
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
                    ShopLogoUrl = shop?.Photos?.FirstOrDefault(x => x.Type == Core.File.Enums.FileType.ShopLogo).FullName
                },
                Status = user.UserStatus,
                Token = token.Result.JWT
            };
            return new ManagerResult<VerifiedUserWithShopDto>(resultDto);
        }
    }
}
