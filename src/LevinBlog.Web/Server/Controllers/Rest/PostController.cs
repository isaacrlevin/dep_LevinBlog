using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LevinBlog.Service;
using Microsoft.AspNetCore.Authorization;
using LevinBlog.Model;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;
using System;
namespace Pioneer.Blog.Controllers.Web
{
  [Authorize]
  [Route("api/posts")]
  public class PostApiController : Controller
  {
    private readonly IPostService _postService;
    private readonly IPostTagService _postTagService;
    private IMemoryCache _cache;
    private MemoryCacheEntryOptions cacheEntryOptions;
    public PostApiController(IPostService postService, IPostTagService postTagService, IMemoryCache cache)
    {
      _postService = postService;
      _postTagService = postTagService;
      _cache = cache;

      cacheEntryOptions = new MemoryCacheEntryOptions()
          .SetSlidingExpiration(TimeSpan.FromDays(1));
    }

    [AllowAnonymous]
    [HttpGet]
    public IEnumerable<Post> GetAll(
        bool includeExceprt = true,
        bool includeArticle = true,
        bool includeUnpublished = false)
    {
      IEnumerable<Post> cacheEntry;
      // if (!_cache.TryGetValue($"GetAllPosts{includeExceprt}{includeArticle}{includeUnpublished}", out cacheEntry))
      //{
      cacheEntry = _postService.GetAll(includeExceprt, includeArticle, includeUnpublished);
      //  _cache.Set($"GetAllPosts{includeExceprt}{includeArticle}{includeUnpublished}", cacheEntry, cacheEntryOptions);
      //}
      return cacheEntry;
    }

    [AllowAnonymous]
    [HttpGet("GetAllByCategory")]
    public IEnumerable<Post> GetAllByCategory(string category, int? countPerPage, int? currentPageIndex)
    {
      IEnumerable<Post> cacheEntry;
      //if (!_cache.TryGetValue($"GetAllPostsForCategory{category}", out cacheEntry))
      //{
      cacheEntry = _postService.GetAllByCategory(category, countPerPage ?? 5, currentPageIndex ?? 1);
      //  _cache.Set($"GetAllPostsForCategory{category}", cacheEntry, cacheEntryOptions);
      //}
      return cacheEntry;
    }

    [AllowAnonymous]
    [HttpGet("GetAllByTag")]
    public IEnumerable<Post> GetAllByTag(string tag, int? countPerPage, int? currentPageIndex)
    {
      IEnumerable<Post> cacheEntry;
      //if (!_cache.TryGetValue($"GetAllPostsForTag{tag}{countPerPage}{currentPageIndex}", out cacheEntry))
      //{
        cacheEntry = _postService.GetAllByTag(tag, countPerPage ?? 5, currentPageIndex ?? 1);
      //_cache.Set($"GetAllPostsForTag{tag}{countPerPage}{currentPageIndex}", cacheEntry, cacheEntryOptions);

      //}
      return cacheEntry;
    }

    [AllowAnonymous]
    [HttpGet("{url}", Name = "GetPost")]
    public IActionResult GetByUrl(string url, bool includeExcerpt)
    {
      Post cacheEntry;
      //if (!_cache.TryGetValue($"GetById{url}{includeExcerpt}", out cacheEntry))
      //{
      cacheEntry = _postService.GetByUrl(url, includeExcerpt);
      //  _cache.Set($"GetById{url}{includeExcerpt}", cacheEntry, cacheEntryOptions);
      //}

      if (cacheEntry == null)
      {
        return NotFound();
      }

      return new ObjectResult(cacheEntry);
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
  }
}
