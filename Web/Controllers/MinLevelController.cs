using Core.Base;
using Core.Base.Entities;
using Core.Base.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    public class MinLevelController : BaseController
    {
        private readonly IWritableOptions<MinSettings> writableOptions;

        public MinLevelController(IWritableOptions<MinSettings> writableOptions)
        {
            this.writableOptions = writableOptions;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            
            return Ok(writableOptions.Value);
        }

        [HttpGet]
        [Authorize]
        public IActionResult Set(int min)
        {
            writableOptions.Update(x => x.Min = min);
            var result = new ManagerResult<bool>(true);
            return Ok(result);
        }
    }
}
