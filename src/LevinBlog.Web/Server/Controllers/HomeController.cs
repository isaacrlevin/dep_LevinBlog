using LevinBlog.Service;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using System;
using LevinBlog.Model;
using Microsoft.Extensions.Options;
using System.Text;

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
      var nodeServices = Request.HttpContext.RequestServices.GetRequiredService<INodeServices>();
      var hostEnv = Request.HttpContext.RequestServices.GetRequiredService<IHostingEnvironment>();

      var applicationBasePath = hostEnv.ContentRootPath;
      var requestFeature = Request.HttpContext.Features.Get<IHttpRequestFeature>();
      var unencodedPathAndQuery = requestFeature.RawTarget;
      var unencodedAbsoluteUrl = $"{Request.Scheme}://{Request.Host}{unencodedPathAndQuery}";

      // ** TransferData concept **
      // Here we can pass any Custom Data we want !

      // By default we're passing down Cookies, Headers, Host from the Request object here
      TransferData transferData = new TransferData();
      transferData.request = AbstractHttpContextRequestInfo(Request);
      transferData.appInsightsId = _appSettings.AppInsightsId;
      // Add more customData here, add it to the TransferData class

      // Prerender / Serialize application (with Universal)
      var prerenderResult = await Prerenderer.RenderToString(
          "/",
          nodeServices,
          CancellationToken.None,
          new JavaScriptModuleExport(applicationBasePath + "/Client/dist/main-server"),
          unencodedAbsoluteUrl,
          unencodedPathAndQuery,
          transferData, // Our simplified Request object & any other CustommData you want to send!
          30000,
          Request.PathBase.ToString()
      );

      ViewData["SpaHtml"] = prerenderResult.Html; // our <app> from Angular
      ViewData["Title"] = prerenderResult.Globals["title"]; // set our <title> from Angular
      ViewData["Styles"] = prerenderResult.Globals["styles"]; // put styles in the correct place
      ViewData["Meta"] = prerenderResult.Globals["meta"]; // set our <meta> SEO tags
      ViewData["Links"] = prerenderResult.Globals["links"]; // set our <link rel="canonical"> etc SEO tags
      ViewData["TransferData"] = prerenderResult.Globals["transferData"]; // our transfer data set to window.TRANSFER_CACHE = {};
      ViewData["GoogleAnalyticsId"] = _appSettings.GoogleAnalyticsId;
      ViewData["AppInsightsId"] = _appSettings.AppInsightsId;
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

    private IRequest AbstractHttpContextRequestInfo(HttpRequest request)
    {

      IRequest requestSimplified = new IRequest();
      requestSimplified.cookies = request.Cookies;
      requestSimplified.headers = request.Headers;
      requestSimplified.host = request.Host;

      return requestSimplified;
    }
  }

  public class IRequest
  {
    public object cookies { get; set; }
    public object headers { get; set; }
    public object host { get; set; }
  }

  public class TransferData
  {
    public dynamic request { get; set; }

    // Your data here ?
    public string appInsightsId { get; set; }
  }
}
