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
                Identity = model.Identity.OpenReadStream(),
                IdentityExt = model.Identity.ContentType == "image/jpg" ? ".jpg" : MimeTypes.MimeTypeMap.GetExtension(model.Identity.ContentType),
                Selfie = model.Selfie.OpenReadStream(),
                SelfieExt = model.Selfie.ContentType == "image/jpg" ? ".jpg" : MimeTypes.MimeTypeMap.GetExtension(model.Selfie.ContentType)
            };
        }
    }
}
