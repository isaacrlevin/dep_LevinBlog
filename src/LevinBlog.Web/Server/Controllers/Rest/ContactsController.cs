using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LevinBlog.Model;
using Microsoft.AspNetCore.Authorization;
using LevinBlog.Service;

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
