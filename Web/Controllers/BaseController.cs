using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]/{id?}")]
    public class BaseController : ControllerBase
    {
    }
}
