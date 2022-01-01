using Core.File.Entities;
using System.Collections.Generic;
using System.IO;

namespace Core.Services
{
    public interface IFileService
    {
        string SaveIdentity(Stream idStream, string identityExt);

        List<AppFile> SaveSignUpFile(List<FileStream> Pics);
    }
}
