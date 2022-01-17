using Core.File.Enums;
using System.IO;

namespace Core.Base.Dto
{
    public class InputFileDto
    {
        public Stream Stream { get; set; }
        public string Extension { get; set; }
        public FileType FileType { get; set; }
    }
}
