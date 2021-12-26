using Core.Identity.Dto;
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
    }
}
