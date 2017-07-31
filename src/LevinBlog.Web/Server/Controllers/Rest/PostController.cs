using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LevinBlog.Service;
using Microsoft.AspNetCore.Authorization;
using LevinBlog.Model;
using System.Collections.Generic;

namespace Pioneer.Blog.Controllers.Web
{
  [Authorize]
  [Route("api/posts")]
  public class PostApiController : Controller
  {
    private readonly IPostService _postService;
    private readonly IPostTagService _postTagService;

    public PostApiController(IPostService postService, IPostTagService postTagService)
    {
      _postService = postService;
      _postTagService = postTagService;
    }

    [AllowAnonymous]
    [HttpGet]
    public IEnumerable<Post> GetAll(int? countPerPage,
        int? currentPageIndex,
        bool includeExceprt = true,
        bool includeArticle = true,
        bool includeUnpublished = false)
    {
      if (countPerPage == null || currentPageIndex == null)
      {
        return _postService.GetAll(includeExceprt, includeArticle, includeUnpublished);
      }

      return _postService.GetAllPaged((int)countPerPage, (int)currentPageIndex, includeUnpublished);
    }

    [AllowAnonymous]
    [HttpGet("GetAllByCategory")]
    public IEnumerable<Post> GetAllByCategory(string category, int? countPerPage, int? currentPageIndex)
    {
      if (countPerPage == null || currentPageIndex == null)
      {
        return _postService.GetAllByCategory(category, 5);
      }

      return _postService.GetAllByCategory(category, (int)countPerPage, (int)currentPageIndex);
    }

    [AllowAnonymous]
    [HttpGet("GetAllByTag")]
    public IEnumerable<Post> GetAllByTag(string tag, int? countPerPage, int? currentPageIndex)
    {
      if (countPerPage == null || currentPageIndex == null)
      {
        return _postService.GetAllByTag(tag, 5);
      }
      return _postService.GetAllByTag(tag, (int)countPerPage, (int)currentPageIndex);
    }

    [AllowAnonymous]
    [HttpGet("{url}", Name = "GetPost")]
    public IActionResult GetById(string url, bool includeExcerpt = false)
    {
      var item = _postService.GetByUrl(url, includeExcerpt);
      if (item == null)
      {
        return NotFound();
      }

      return new ObjectResult(item);
    }

    [Route("count/total")]
    public IActionResult GetTotalNumberOfPosts()
    {
      return new ObjectResult(_postService.GetTotalNumberOfPosts());
    }

    [HttpPost]
    public IActionResult Create([FromBody]Post post)
    {
      if (post == null)
      {
        return BadRequest();
      }

      var newPost = _postService.Add(post);
      _postTagService.Sync(post.Tags.Select(a => new PostTag { PostId = newPost.Id, TagId = a.Id }).ToList());
      return CreatedAtRoute("GetPost", new { url = post.Url }, post);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Post item)
    {
      if (item == null)
      {
        return BadRequest();
      }

      var todo = _postService.GetById(id);
      if (todo == null)
      {
        return NotFound();
      }

      _postService.Update(item);
      _postTagService.Sync(item.Tags.Select(a => new PostTag { PostId = item.Id, TagId = a.Id }).ToList());
      return new NoContentResult();
    }

    //[HttpDelete("{url}")]
    //[Authorize(Policy = "isSuperUser")]
    //public IActionResult Delete(string url)
    //{
    //    var todo = _postService.GetByUrl(url);
    //    if (todo == null)
    //    {
    //        return NotFound();
    //    }

    //    _postService.Remove(url);
    //    return new NoContentResult();
    //}
  }
}
