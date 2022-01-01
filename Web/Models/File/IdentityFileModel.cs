using Microsoft.AspNetCore.Http;

namespace Web.Models.File
{
    public class IdentityFileModel
    {
        public IFormFile Selfie { get; set; }
        public IFormFile Identity { get; set; }
    }
}
