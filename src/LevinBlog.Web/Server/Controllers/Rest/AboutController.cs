using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.PlatformAbstractions;
using System.Runtime.Versioning;
using System.Reflection;

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
      return new  {
        RuntimeFramework = System.Reflection.Assembly.GetEntryAssembly().GetCustomAttribute<TargetFrameworkAttribute>().FrameworkName };
    }
  }
}
