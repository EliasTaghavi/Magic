using Core.File.Entities;
using Core.Services;
using System;
using System.Collections.Generic;
using System.IO;

namespace Infrastructure.Services
{
    public class FileService : IFileService
    {
        public string SaveIdentity(Stream idStream, string identityExt)
        {
            string fileName = Guid.NewGuid().ToString();
            using (FileStream idFileStream = new($"ids/{fileName}{identityExt}", FileMode.Create))
            {
                idStream.CopyTo(idFileStream);
            }
            return fileName;
        }

        public List<AppFile> SaveSignUpFile(List<FileStream> Pics)
        {
            throw new NotImplementedException();
        }
    }
}
