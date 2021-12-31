using Core.Base.Entities;
using Core.File.Enums;
using Core.Identity.Entities;

namespace Core.File.Entities
{
    public class AppFile : BaseEntity
    {
        public string FileExtension { get; set; }
        public string FullName => $"{Id}.{FileExtension}";
        public FileType Type { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
