using Core.Identity.Dto;
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
    }
}
