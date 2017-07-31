using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using LevinBlog.Database.Entity;
using LevinBlog.Model;
using LevinBlog.Repository;
using Microsoft.Extensions.Options;

namespace LevinBlog.Service
{
    public interface ISearchService
    {
        IEnumerable<Post> SearchPosts(string query, int count, int page = 1);
    }

    public class SearchService : ISearchService
    {
        private readonly IPostRepository _postRepository;

        public SearchService(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public IEnumerable<Post> SearchPosts(string query, int count, int page = 1)
        {
           return _postRepository.GetQueryPaged(query, count, page).Select(Mapper.Map<PostEntity, Post>).ToList();
        }
    }
}
