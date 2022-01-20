using Core.Base.Dto;
using Core.File.Entities;
using System.IO;

namespace Core.Services
{
    public interface IFileService
    {
        string SaveIdentity(InputFileDto inputFileDto);

        List<AppFile> SaveSignUpFile(List<FileStream> Pics);
    }
}
