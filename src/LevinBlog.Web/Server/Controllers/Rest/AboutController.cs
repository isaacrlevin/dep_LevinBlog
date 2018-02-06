using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Runtime.Versioning;

namespace LevinBlog.Web.Server.Controllers.Rest
{
  [Authorize]
  [Route("api/about")]
  public class PostApiController : Controller
  {
    [AllowAnonymous]
    [HttpGet]
    public object Get()
    {
      return new
      {
        RuntimeFramework = System.Reflection.Assembly.GetEntryAssembly().GetCustomAttribute<TargetFrameworkAttribute>().FrameworkName
      };
    }
  }
}
