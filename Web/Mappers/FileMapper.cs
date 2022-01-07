using Core;
using Core.File.Dto;
using Web.Models.File;

namespace Web.Mappers
{
    public static class FileMapper
    {
        public static IdentityFileDto ToDto(this IdentityFileModel model, string userId)
        {
            return new IdentityFileDto
            {
                UserId = userId,
                IdentityDto = new Core.Base.Dto.InputFileDto
                {
                    Stream = model.Identity.OpenReadStream(),
                    Extension = MimeTypesMap.GetExtension(model.Identity.ContentType)
                },
                SelfieDto = new Core.Base.Dto.InputFileDto
                {
                    Stream = model.Selfie.OpenReadStream(),
                    Extension = MimeTypesMap.GetExtension(model.Selfie.ContentType)
                }
            };
        }
    }
}
