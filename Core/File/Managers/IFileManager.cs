using Core.Base.Entities;
using Core.File.Dto;

namespace Core.File.Managers
{
    public interface IFileManager
    {
        ManagerResult<bool> UploadIdentities(IdentityFileDto dto);
        ManagerResult<string> GetSelfie(string userId);
    }
}
