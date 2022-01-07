using Core.Base.Dto;
using System.IO;

namespace Core.File.Dto
{
    public class IdentityFileDto
    {
        public InputFileDto SelfieDto { get; set; }
        public InputFileDto IdentityDto { get; set; }
        public string UserId { get; set; }
    }
}
