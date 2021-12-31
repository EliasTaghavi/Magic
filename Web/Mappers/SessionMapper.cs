using Core.Identity.Dto;
using Core.Identity.Entities;
using Web.Models.Session;

namespace Web.Mappers
{
    public static class SessionMapper
    {
        public static VerifyTokenPhoneDto ToDto(this VerifyTokenPhoneModel model, string ip)
        {
            return new VerifyTokenPhoneDto
            {
                IP = ip,
                Phone = model.Phone,
                Token = model.Token,
            };
        }

        public static UPSessionCreateDto ToDto(this UPSessionCreateModel model, string ip)
        {
            return new UPSessionCreateDto
            {
                Ip = ip,
                Password = model.Password,
                Username = model.Username,
            };
        }

        public static VerifiedUserViewModel ToVerifiedUserViewModel(this AccessToken token)
        {
            return new VerifiedUserViewModel
            {
                Address = token.User.Address,
                Birthday = token.User.Birthday,
                Confirmed = token.User.Confirmed,
                FirstName = token.User.Name,
                LastName = token.User.Surname,
                Mobile = token.User.Mobile,
                SelfieURL = string.Empty,
                Token = token.JWT
            };
        }
    }
}
