using System.IO;

namespace Core.File.Dto
{
    public class IdentityFileDto
    {
        public Stream Selfie { get; set; }
        public string SelfieExt { get; set; }
        public Stream Identity { get; set; }
        public string IdentityExt { get; set; }
        public string UserId { get; set; }
    }
}
