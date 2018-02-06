using LevinBlog.Model;
using LevinBlog.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LevinBlog.Web.Server.Controllers.Rest
{
  [Authorize]
  [Route("[controller]")]
  public class ContactsController : Controller
  {
    private readonly ICommunicationService _communicationService;

    public ContactsController(ICommunicationService communicationService)
    {
      if (communicationService != null)
      {
        _communicationService = communicationService;
      }
    }

    [AllowAnonymous]
    [HttpPost]
    public void Send([FromBody]SignUpViewModel model)
    {
      var response = _communicationService.SignUpToMailingList(model);
    }
  }
}
