using Core.File.Dto;
using System.IO;
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
                IdentityExt = Path.GetExtension(model.Identity.FileName),
                Selfie = model.Selfie.OpenReadStream(),
                SelfieExt = Path.GetExtension(model.Selfie.FileName)
            };
        }
    }
}
