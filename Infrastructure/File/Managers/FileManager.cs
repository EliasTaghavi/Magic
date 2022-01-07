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

        public ManagerResult<bool> UploadIdentities(IdentityFileDto dto)
        {
            if (dto.SelfieDto == null || dto.IdentityDto == null)
            {
                return new ManagerResult<bool>
                {
                    Code = 12,
                    Message = "ErrorsWithFiles.",
                    Success = false
                };
            }
            var identityFileName = fileService.SaveIdentity(dto.IdentityDto);
            var idFile = new AppFile
            {
                Id = identityFileName,
                Enable = true,
                FileExtension = dto.IdentityDto.Extension,
                ObjectState = ObjectState.Added,
                Type = FileType.Identity,
                UserId = dto.UserId,
            };
            fileRepo.Create(idFile);

            var selfieFileName = fileService.SaveIdentity(dto.SelfieDto);
            var SelfieFile = new AppFile
            {
                Id = selfieFileName,
                Enable = true,
                FileExtension = dto.SelfieDto.Extension,
                ObjectState = ObjectState.Added,
                Type = FileType.Selfie,
                UserId = dto.UserId,
            };
            fileRepo.Create(SelfieFile);

            return new ManagerResult<bool>
            {
                Success = true,
                Message = "IdentitiesUploadSuccessfully.",
                Code = 13,
            };
        }
    }
}
