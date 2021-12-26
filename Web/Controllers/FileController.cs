using Core.File.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using Web.Mappers;
using Web.Models.File;

namespace Web.Controllers
{

    public class FileController : BaseController
    {
        private readonly IFileManager fileManager;

        public FileController(IFileManager fileManager)
        {
            this.fileManager = fileManager;
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
    }
}
