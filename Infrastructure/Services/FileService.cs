using Core.Base.Dto;
using Core.File.Entities;
using Core.Services;
using System.IO;

namespace Infrastructure.Services
{
    public class FileService : IFileService
    {
        public string SaveIdentity(InputFileDto inputFileDto)
        {
            string fileName = Guid.NewGuid().ToString();
            using (FileStream idFileStream = new($"ids/{fileName}.{inputFileDto.Extension}", FileMode.Create))
            {
                inputFileDto.Stream.CopyTo(idFileStream);
            }
            return fileName;
        }

        public List<AppFile> SaveSignUpFile(List<FileStream> Pics)
        {
            throw new NotImplementedException();
        }
    }
}
