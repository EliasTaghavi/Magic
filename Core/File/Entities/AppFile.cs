using Core.Base.Entities;
using Core.File.Enums;

namespace Core.File.Entities
{
    public class AppFile : BaseEntity
    {
        public string FileExtension { get; set; }
        public string FullName => $"{Id}.{FileExtension}";
        public FileType Type { get; set; }
        public string RefId { get; set; }
    }
}
