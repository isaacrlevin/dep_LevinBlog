using AutoMapper;
using LevinBlog.Database.Entity;
using LevinBlog.Model;
using LevinBlog.Repository;
using System.Collections.Generic;

namespace LevinBlog.Service
{
    public interface IPostTagService
    {
        PostTag Add(PostTag postTag);

        void Delete(PostTag postTag);

        void Sync(List<PostTag> postTags);
    }

    public class PostTagService : IPostTagService
    {
        private readonly IPostTagRepository _postTagRepository;

        public PostTagService(IPostTagRepository postTagRepository)
        {
            _postTagRepository = postTagRepository;
        }

        /// <summary>
        /// Add a new PostTag record
        /// </summary>
        /// <param name="postTag">Compound Key</param>
        /// <returns>Qualified PostTag</returns>
        public PostTag Add(PostTag postTag)
        {
            var entity = _postTagRepository.Add(Mapper.Map<PostTag, PostTagEntity>(postTag));
            postTag.PostTagId = entity.PostTagId;
            return postTag;
        }

        /// <summary>
        /// Delete a PostTag by compound key
        /// </summary>
        /// <param name="postTag">Compound Key</param>
        public void Delete(PostTag postTag)
        {
            _postTagRepository.RemoveByCompound(Mapper.Map<PostTag, PostTagEntity>(postTag));
        }

        public void Sync(List<PostTag> postTags)
        {
            _postTagRepository.Sync(Mapper.Map<List<PostTag>, List<PostTagEntity>>(postTags));
        }
    }
}