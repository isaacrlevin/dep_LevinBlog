using LevinBlog.Model;
using LevinBlog.Service;
using LevinBlog.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;

namespace LevinBlog.Web.Controllers
{
  public class HomeController : Controller
  {
    private readonly AppConfiguration _appSettings;
    private readonly ISiteMapService _siteMapService;
    private readonly IRSSFeedService _rssFeedService;

    public HomeController(
    IOptions<AppConfiguration> appSettings, ISiteMapService siteMapService, IRSSFeedService rssFeedService)
    {
      _appSettings = appSettings?.Value;
      _siteMapService = siteMapService;
      _rssFeedService = rssFeedService;
    }

    public async Task<IActionResult> Index()
    {
      var prerenderResult = await Request.BuildPrerender(_appSettings);

      ViewData["SpaHtml"] = prerenderResult.Html; // our <app-root /> from Angular
      ViewData["Title"] = prerenderResult.Globals["title"]; // set our <title> from Angular
      ViewData["Styles"] = prerenderResult.Globals["styles"]; // put styles in the correct place
      ViewData["Scripts"] = prerenderResult.Globals["scripts"]; // scripts (that were in our header)
      ViewData["Meta"] = prerenderResult.Globals["meta"]; // set our <meta> SEO tags
      ViewData["Links"] = prerenderResult.Globals["links"]; // set our <link rel="canonical"> etc SEO tags
      ViewData["TransferData"] = prerenderResult.Globals["transferData"]; // our transfer data set to window.TRANSFER_CACHE = {};

      //if (!Debugger.IsAttached)
      //{
        ViewData["GoogleAnalyticsId"] = _appSettings.GoogleAnalyticsId;
        ViewData["AppInsightsId"] = _appSettings.AppInsightsId;
      //}
      return View();
    }

    public IActionResult SiteMap()
    {
      return Content(_siteMapService.GetSiteMap(), "text/xml", Encoding.UTF8);
    }

    public IActionResult RSSFeed()
    {
      return Content(_rssFeedService.GetRSSFeed(), "text/xml", Encoding.UTF8);
    }

    public IActionResult Error()
    {
      return View();
    }
  }
}
