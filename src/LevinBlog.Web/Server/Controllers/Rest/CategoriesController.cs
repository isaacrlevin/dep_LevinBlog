using LevinBlog.Model;
using LevinBlog.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace LevinBlog.Web.Server.Controllers.Rest
{
  [Authorize]
  [Route("[controller]")]
  public class CategoriesController : Controller
  {
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
      _categoryService = categoryService;
    }

    [AllowAnonymous]
    [HttpGet]
    public IEnumerable<Category> GetAll(int? count, int? page)
    {
      if (count == null || page == null)
      {
        return _categoryService.GetAll();
      }

      return _categoryService.GetAllPaged((int)count, (int)page);
    }

    [AllowAnonymous]
    [HttpGet("{id}", Name = "GetCategory")]
    public IActionResult GetById(int id)
    {
      var item = _categoryService.GetById(id);
      if (item == null)
      {
        return NotFound();
      }

      return new ObjectResult(item);
    }

    [HttpPost]
    public IActionResult Create([FromBody]Category category)
    {
      if (category == null)
      {
        return BadRequest();
      }

      _categoryService.Add(category);
      return CreatedAtRoute("GetCategory", new { id = category.Id }, category);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Category item)
    {
      if (item == null || item.Id != id)
      {
        return BadRequest();
      }

      var todo = _categoryService.GetById(id);
      if (todo == null)
      {
        return NotFound();
      }

      _categoryService.Update(item);
      return new NoContentResult();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      if (id == 0)
      {
        return BadRequest();
      }

      var todo = _categoryService.GetById(id);
      if (todo == null)
      {
        return NotFound();
      }

      _categoryService.Remove(id);
      return new NoContentResult();
    }
  }
}
