using Core.Base.Dto;
using Core.Base.Entities;
using Core.File.Dto;
using Core.File.Enums;

namespace Core.File.Managers
{
    public interface IFileManager
    {
        ManagerResult<bool> UploadIdentities(IdentityFileDto dto);
        ManagerResult<string> GetSelfie(string userId);
        ManagerResult<bool> AddShopPhoto(InputFileDto item, string shopId, FileType fileType);
        ManagerResult<List<string>> GetShopPhotos(string id);
        ManagerResult<bool> Delete(string photoId);
    }
}
