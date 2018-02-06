using LevinBlog.Model;
using LevinBlog.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace LevinBlog.Web.Server.Controllers.Rest
{
  [Authorize]
  [Route("[controller]")]
  public class TagsController : Controller
  {
    private readonly ITagService _tagService;

    public TagsController(ITagService tagService)
    {
      _tagService = tagService;
    }

    [AllowAnonymous]
    [HttpGet]
    public IEnumerable<Tag> GetAll(int? count, int? page)
    {
      if (count == null || page == null)
      {
        return _tagService.GetAll();
      }

      return _tagService.GetAllPaged((int)count, (int)page);
    }

    [AllowAnonymous]
    [HttpGet("{id}", Name = "GetTag")]
    public IActionResult GetById(int id)
    {
      var item = _tagService.GetById(id);
      if (item == null)
      {
        return NotFound();
      }

      return new ObjectResult(item);
    }

    [HttpPost]
    public IActionResult Create([FromBody]Tag tag)
    {
      if (tag == null)
      {
        return BadRequest();
      }

      _tagService.Add(tag);
      return CreatedAtRoute("GetTag", new { id = tag.Id }, tag);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Tag item)
    {
      if (item == null || item.Id != id)
      {
        return BadRequest();
      }

      var todo = _tagService.GetById(id);
      if (todo == null)
      {
        return NotFound();
      }

      _tagService.Update(item);
      return new NoContentResult();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      if (id == 0)
      {
        return BadRequest();
      }

      var todo = _tagService.GetById(id);
      if (todo == null)
      {
        return NotFound();
      }

      _tagService.Remove(id);
      return new NoContentResult();
    }
  }
}
