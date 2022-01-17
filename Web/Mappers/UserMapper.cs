using Core.Identity.Dto;
using Core.Services.Dto;
using Web.Models.User;

namespace Web.Mappers
{
    public static class UserMapper
    {
        public static CreateUserDto ToDto(this CreateUserViewModel viewModel)
        {
            return new CreateUserDto
            {
                Phone = viewModel.Phone,
                FirstName = viewModel.FirstName,
                Lastname = viewModel.Lastname,
            };
        }

        public static UserFillDataDto ToDto(this UserFillDataViewModel viewModel)
        {
            return new UserFillDataDto
            {
                Address = viewModel.Address,
                Birthday = viewModel.Birthday,
                FirstName = viewModel.FirstName,
                LastName = viewModel.LastName,
                RefCode = viewModel.RefCode,
            };
        }

        public static UserListFilterDto ToDto(this UserListFilterViewModel viewModel)
        {
            return new UserListFilterDto
            {
                Status = viewModel.Status,
                Mobile = viewModel.Mobile,
            };
        }

        public static UserListViewModel ToViewModel(this UserListDto dto)
        {
            return new UserListViewModel
            {
                Address = dto.Address,
                Birthday = dto.Birthday,
                FirstName = dto.FirstName,
                Id = dto.Id,
                IdentityURL = dto.IdentityURL,
                LastName = dto.LastName,
                Mobile = dto.Mobile,
                SelfieURL = dto.SelfieURL,
                Status = dto.Status,
                CeatedDate = dto.CreatedDate
            };
        }
        public static RejectMessageDto ToDto(this RejectMessageViewModel viewModel)
        {
            return new RejectMessageDto
            {
                Message = viewModel.Message,
                UserId = viewModel.UserId,
            };
        }

        public static ConfirmUserDto ToDto(this ConfirmUserViewModel viewModel)
        {
            return new ConfirmUserDto
            {
                Type = viewModel.Type,
                UserId = viewModel.UserId,
            };
        }
    }
}
