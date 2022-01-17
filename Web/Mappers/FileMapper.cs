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
                IdentityDto = model?.Identity != null ? new Core.Base.Dto.InputFileDto
                {
                    Stream = model?.Identity?.OpenReadStream(),
                    Extension = MimeTypesMap.GetExtension(model?.Identity?.ContentType)
                } : null,
                SelfieDto = model?.Selfie != null ? new Core.Base.Dto.InputFileDto
                {
                    Stream = model?.Selfie?.OpenReadStream(),
                    Extension = MimeTypesMap.GetExtension(model?.Selfie?.ContentType)
                } : null
            };
        }
    }
}
