using Core;
using Core.Base.Dto;
using Core.Identity.Dto;
using Core.Shops.Dto;
using Web.Models.Shop;

namespace Web.Mappers
{
    public static class ShopMapper
    {
        public static ShopBuyerDto ToDto(this GetBuyerViewModel viewModel, string shoperId)
        {
            return new ShopBuyerDto
            {
                ShoperId = shoperId,
                UserId = viewModel.UserId,
            };
        }

        public static CreateShopDto ToDto(this CreateShopViewModel viewModel)
        {
            return new CreateShopDto
            {
                Address = viewModel.Address,
                Name = viewModel.Name,
                Phone = viewModel.Phone,
                UserMobile = viewModel.UserMobile,
                UserName = viewModel.UserName,
                UserSurname = viewModel.UserSurname,
                LatestOff = viewModel.LatestOff,
                Refcode = viewModel.Refcode,
                Password = viewModel.Password,
            };
        }

        public static ShopListFilterDto ToDto(this ShopListFilterViewModel viewModel)
        {
            return new ShopListFilterDto
            {
                Keyword = viewModel.Keyword.ToDto(),
            };
        }

        public static ShopWithUserViewModel ToViewModel(this ShopWithUserDto dto)
        {
            return new ShopWithUserViewModel
            {
                Address = dto.Address,
                Id = dto.Id,
                Name = dto.Name,
                Phone = dto.Phone,
                UserFullName = dto.UserFullName,
                UserMobile = dto.UserMobile,
                CreatedDate = dto.CreatedDate,
                LatestOff = dto.LatestOff,
                RefCode = dto.RefCode,
                Photos = dto.Photos
            };
        }

        public static List<ShopWithUserViewModel> ToViewModel(this List<ShopWithUserDto> dto)
        {
            return dto.Select(x => x.ToViewModel()).ToList();
        }

        public static UpdateShopOffDto ToDto(this UpdateShopOffViewModel viewModel)
        {
            return new UpdateShopOffDto
            {
                Percentage = viewModel.Percentage,
                ShopId = viewModel.ShopId,
            };
        }

        public static BuyerViewModel ToViewModel(this BuyerDto dto)
        {
            return new BuyerViewModel
            {
                DayRemain = dto.DayRemain,
                ExpireDate = dto.ExpireDate,
                Lastname = dto.Lastname,
                Name = dto.Name,
                PackStatus = dto.PackStatus,
                SelfieUrl = dto.SelfieUrl,
                Discount = dto.ShopOff,
                UserType = dto.UserType,
            };
        }

        public static AddPhotosForShopDto ToDto(this AddShopPhotosViewModel viewModel)
        {
            var dto = new AddPhotosForShopDto
            {
                ShopId = viewModel.ShopId,
                Deleted = viewModel.Deleted,
                InputFileDtos = new List<InputFileDto>()
            };
            if (viewModel.Files != null)
            {
                foreach (var file in viewModel?.Files)
                {
                    var stream = file != null ? new InputFileDto
                    {
                        Stream = file.OpenReadStream(),
                        Extension = MimeTypesMap.GetExtension(file.ContentType)
                    } : null;
                    dto.InputFileDtos.Add(stream);
                }
            }

            return dto;
        }
    }
}
