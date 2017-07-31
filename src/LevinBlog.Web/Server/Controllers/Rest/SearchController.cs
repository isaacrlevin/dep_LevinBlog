using Microsoft.AspNetCore.Mvc.Razor.Internal;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LevinBlog.Service;
using Microsoft.AspNetCore.Authorization;
using LevinBlog.Model;
using System.Collections.Generic;

namespace Pioneer.Blog.Controllers.Web
{
  [Authorize]
  [Route("api/search")]
  public class SearchApiController : Controller
  {
    private readonly IPostService _postService;
    private readonly IPostTagService _postTagService;
    private readonly ISearchService _searchService;

    public SearchApiController(IPostService postService, IPostTagService postTagService, ISearchService searchService)
    {
      _postService = postService;
      _searchService = searchService;
      _postTagService = postTagService;
    }
    [AllowAnonymous]
    [HttpGet("{query}")]
    public IEnumerable<Post> GetQuery(string query)
    {
      return _searchService.SearchPosts(query, 5, 1);
    }
  }
}
