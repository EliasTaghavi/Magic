using Core.Base.Dto;
using Core.Base.Entities;
using Core.File.Enums;
using Core.File.Managers;
using Core.Identity.Dto;
using Core.Identity.Enums;
using Core.Identity.Managers;
using Core.Identity.Repos;
using Core.Shops.Dto;
using Core.Shops.Entities;
using Core.Shops.Managers;
using Core.Shops.Mappers;
using Core.Shops.Repos;

namespace Infrastructure.Shops.Managers
{
    public class ShopManager : IShopManager
    {
        private readonly IShopRepo shopRepo;
        private readonly IRoleRepo roleRepo;
        private readonly IUserRepo userRepo;
        private readonly IShopOffRepo shopOffRepo;
        private readonly IUserManager userManager;
        private readonly ISessionManager sessionManager;
        private readonly IFileManager fileManager;

        public ShopManager(IShopRepo shopRepo,
                           IRoleRepo roleRepo,
                           IUserRepo userRepo,
                           IShopOffRepo shopOffRepo,
                           IUserManager userManager,
                           ISessionManager sessionManager,
                           IFileManager fileManager)
        {
            this.shopRepo = shopRepo;
            this.roleRepo = roleRepo;
            this.userRepo = userRepo;
            this.shopOffRepo = shopOffRepo;
            this.userManager = userManager;
            this.sessionManager = sessionManager;
            this.fileManager = fileManager;
        }

        public ManagerResult<bool> AddPhotos(AddPhotosForShopDto dto)
        {
            foreach (var item in dto.InputFileDtos)
            {
                fileManager.AddShopPhoto(item, dto.ShopId, FileType.Shop);
            }
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<bool> Create(CreateShopDto dto)
        {
            var user = userRepo.ReadByPhone(dto.UserMobile);
            if (user == null)
            {
                var userDto = new CreateUserDto
                {
                    FirstName = dto.UserName,
                    Lastname = dto.UserSurname,
                    Phone = dto.UserMobile,
                    Status = UserStatus.NewUserFromShop,
                    Password = dto.Password,
                };
                user = userManager.CreateByPhone(userDto, "Shop").Result;
            }
            else
            {
                var role = roleRepo.GetByName("Shop");
                user.Roles.Add(role);
                userRepo.Update(user);
            }

            var shop = dto.ToDataModel();
            shop.UserId = user.Id;
            shopRepo.Create(shop);
            var shopOff = new ShopOff
            {
                Percentage = dto.LatestOff,
                ShopId = shop.Id
            };
            shopOffRepo.Create(shopOff);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<bool> Delete(string id)
        {
            shopRepo.Delete(id);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<bool> DeletePhoto(string photoId)
        {
            var result = fileManager.Delete(photoId);
            return result;
        }

        public ManagerResult<string> FindByRef(string refCode)
        {
            var shopName = shopRepo.GetSet().Where(x => x.ReferralCode.ToLower() == refCode.ToLower()).FirstOrDefault()?.Name;
            return new ManagerResult<string>(shopName);
        }

        public ManagerResult<ShopDetailsDto> Get(string id)
        {
            var shop = shopRepo.GetWithDetails(id);
            var photos = fileManager.GetShopPhotos(id);
            var result = new ShopDetailsDto
            {
                Address = shop.Address,
                CreatedDate = shop.CreatedDate,
                Id = id,
                LatestOff = shop.Offs.First().Percentage,
                Name = shop.Name,
                Phone = shop.Phone,
                RefCode = shop.ReferralCode,
                UserFullName = $"{shop.User.Name} {shop.User.Surname}",
                Photos = photos.Result
            };
            return new ManagerResult<ShopDetailsDto>(result);
        }

        public ManagerResult<List<ShopSimpleDto>> GetList()
        {
            var result = shopRepo.GetList();
            return new ManagerResult<List<ShopSimpleDto>>(result.ToSimpleDto());
        }

        public ManagerResult<List<string>> GetPhotos(string Id)
        {
            List<string> photos = fileManager.GetShopPhotos(Id).Result;

            return new ManagerResult<List<string>>(photos);
        }

        public ManagerResult<PagedListDto<ShopWithUserDto>> Search(PageRequestDto<ShopListFilterDto> filterDto)
        {
            var result = shopRepo.Search(filterDto);
            var photos = fileManager.GetShopPhotos(result.Items.Select(x => x.Id)).Result;
            var dto = new PagedListDto<ShopWithUserDto>
            {
                Count = result.Count,
                Items = result.Items.ToDto(photos)
            };
            return new ManagerResult<PagedListDto<ShopWithUserDto>>(dto);
        }

        public ManagerResult<bool> UpdateOff(UpdateShopOffDto dto)
        {
            var shopOff = new ShopOff
            {
                Percentage = dto.Percentage,
                ShopId = dto.ShopId
            };
            shopOffRepo.Create(shopOff);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<VerifiedUserWithShopDto> VerifyTokenByPhoneForShop(VerifyTokenPhoneDto verifyTokenPhoneDto)
        {
            var token = sessionManager.VerifyTokenByPhone(verifyTokenPhoneDto);
            var user = token.Result.User;
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
    }
}
