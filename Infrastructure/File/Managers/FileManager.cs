using Core.Base.Dto;
using Core.Base.Entities;
using Core.Base.Enums;
using Core.File.Dto;
using Core.File.Entities;
using Core.File.Enums;
using Core.File.Managers;
using Core.File.Repos;
using Core.Services;

namespace Infrastructure.File.Managers
{
    public class FileManager : IFileManager
    {
        private readonly IAppFileRepo fileRepo;
        private readonly IFileService fileService;

        public FileManager(IAppFileRepo fileRepo, IFileService fileService)
        {
            this.fileRepo = fileRepo;
            this.fileService = fileService;
        }

        public ManagerResult<bool> AddShopPhoto(InputFileDto item, string shopId, FileType fileType)
        {
            var fileName = fileService.Save(item);
            var file = new AppFile
            {
                Id = fileName,
                Enable = true,
                FileExtension = item.Extension,
                ObjectState = ObjectState.Added,
                Type = fileType,
                RefId = shopId,
            };
            fileRepo.Create(file);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<bool> Delete(string photoId)
        {
            var result = fileRepo.Delete(photoId);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<string> GetSelfie(string userId)
        {
            var result = fileRepo.GetSelfie(userId);
            return new ManagerResult<string>(result);
        }

        public ManagerResult<List<string>> GetShopPhotos(string id)
        {
            var others = fileRepo.GetSet().Where(x => x.RefId == id && x.Type == FileType.Shop)?.Select(x => x.FullName).ToList();
            var result = new List<string>();
            result.AddRange(others);
            return new ManagerResult<List<string>>(result);
        }

        public ManagerResult<List<AppFile>> GetShopPhotos(IEnumerable<string> enumerable)
        {
            var result = fileRepo.GetSet().Where(x => enumerable.Contains(x.RefId)).ToList();
            return new ManagerResult<List<AppFile>>(result);
        }

        public ManagerResult<bool> UploadIdentities(IdentityFileDto dto)
        {
            if (dto.SelfieDto == null)
            {
                return new ManagerResult<bool>
                {
                    Code = 12,
                    Message = "ErrorsWithFiles.",
                    Success = false
                };
            }
            var selfieFileName = fileService.SaveIdentity(dto.SelfieDto);
            var SelfieFile = new AppFile
            {
                Id = selfieFileName,
                Enable = true,
                FileExtension = dto.SelfieDto.Extension,
                ObjectState = ObjectState.Added,
                Type = FileType.Selfie,
                RefId = dto.UserId,
            };
            fileRepo.Create(SelfieFile);

            if (dto.IdentityDto != null)
            {


                var identityFileName = fileService.SaveIdentity(dto.IdentityDto);
                var idFile = new AppFile
                {
                    Id = identityFileName,
                    Enable = true,
                    FileExtension = dto.IdentityDto.Extension,
                    ObjectState = ObjectState.Added,
                    Type = FileType.Identity,
                    RefId = dto.UserId,
                };
                fileRepo.Create(idFile);
            }

            return new ManagerResult<bool>
            {
                Success = true,
                Message = "IdentitiesUploadSuccessfully.",
                Code = 13,
            };
        }
    }
}
