using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity.Service;
using LevinBlog.Web.Identity;

namespace LevinBlog.Web.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet("/")]
        public IActionResult Index()
        {
            return RedirectToAction("Index", "Home", new { area = "IdentityService" });
        }
    }
}