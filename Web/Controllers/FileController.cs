using Core;
using Core.File.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using System.Security.Claims;
using Web.Mappers;
using Web.Models.File;

namespace Web.Controllers
{

    public class FileController : BaseController
    {
        private readonly IFileManager fileManager;
        private readonly IWebHostEnvironment environment;

        public FileController(IFileManager fileManager, IWebHostEnvironment environment)
        {
            this.fileManager = fileManager;
            this.environment = environment;
        }

        [Authorize]
        [HttpPost]
        public IActionResult UploadIdentity([FromForm] IdentityFileModel model)
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.UserData).Value;
            var dto = model.ToDto(userId);
            var response = fileManager.UploadIdentities(dto);
            return Ok(response);
        }

        [Authorize]
        [HttpPost]
        public IActionResult GetFile([FromQuery] string id)
        {
            var path = Path.Combine(environment.ContentRootPath, "ids", id);
            string ext = id.Split('.')[1];
            string mime = MimeTypesMap.GetMimeType($".{ext}");
            return PhysicalFile(path, mime);
        }
    }
}
