using LevinBlog.Model;
using LevinBlog.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LevinBlog.Web.Server.Controllers
{
  [Authorize]
  [Route("[controller]")]
  public class UsersController : Controller
  {
    private readonly IUserService _userService;
    private readonly AppConfiguration _appSettings;

    public UsersController(
        IUserService userService,
        IOptions<AppConfiguration> appSettings)
    {
      if (userService != null)
      {
        _userService = userService;
      }

      _appSettings = appSettings?.Value;
    }

    [HttpGet]
    public IActionResult Authenticate()
    {
      return Ok(true);
    }

    [AllowAnonymous]
    [HttpPost("authenticate")]
    public IActionResult Authenticate([FromBody]User userDto)
    {
      var user = _userService.Authenticate(userDto.Username, userDto.Password);

      if (user == null)
        return Unauthorized();

      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_appSettings.Key);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
          {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
          }),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      var tokenString = tokenHandler.WriteToken(token);

      // return basic user info (without password) and token to store client side
      return Ok(new
      {
        Id = user.Id,
        Username = user.Username,
        FirstName = user.FirstName,
        LastName = user.LastName,
        Token = tokenString
      });
    }

    [AllowAnonymous]
    [HttpPost]
    public IActionResult Register([FromBody]User userDto)
    {
      try
      {
        // save
        _userService.Create(userDto, userDto.Password);
        return Ok();
      }
      catch (AppException ex)
      {
        // return error message if there was an exception
        return BadRequest(ex.Message);
      }
    }

    [HttpGet]
    public IActionResult GetAll()
    {
      var users = _userService.GetAll();
      return Ok(users);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      var user = _userService.GetById(id);
      return Ok(user);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody]User userDto)
    {
      // map dto to entity and set id
      userDto.Id = id;

      try
      {
        // save
        _userService.Update(userDto, userDto.Password);
        return Ok();
      }
      catch (AppException ex)
      {
        // return error message if there was an exception
        return BadRequest(ex.Message);
      }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      _userService.Delete(id);
      return Ok();
    }
  }
}
