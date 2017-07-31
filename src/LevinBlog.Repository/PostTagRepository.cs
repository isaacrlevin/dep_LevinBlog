using LevinBlog.Model;
using System.Linq;
using LevinBlog.Database;
using LevinBlog.Database.Entity;
using System.Collections.Generic;

namespace LevinBlog.Repository
{
    public interface IPostTagRepository
    {
        PostTagEntity Add(PostTagEntity map);
        void RemoveByCompound(PostTagEntity map);

        void Sync(List<PostTagEntity> postTags);
    }

    public class PostTagRepository : IPostTagRepository
    {
        private readonly BlogContext _blogContext;

        public PostTagRepository(BlogContext blogContext)
        {
            _blogContext = blogContext;
        }

        /// <summary>
        /// Add a new PostTagEntity record
        /// </summary>
        /// <param name="postTag">Compound Key</param>
        /// <returns>Qualified PostTagEntity</returns>
        public PostTagEntity Add(PostTagEntity postTag)
        {
            _blogContext
                .PostTags
                .Add(postTag);

            _blogContext.SaveChanges();

            return postTag;
        }

        /// <summary>
        /// Delete a PostTagEntity by compound key
        /// </summary>
        /// <param name="postTag">Compound Key</param>
        public void RemoveByCompound(PostTagEntity postTag)
        {
            var entity = _blogContext
               .PostTags
               .FirstOrDefault(x => x.PostId == postTag.PostId && x.TagId == postTag.TagId);

            _blogContext.PostTags.Remove(entity);
            _blogContext.SaveChanges();
        }

        /// <summary>
        /// Sync Post Tags from UI
        /// </summary>
        /// <param name="postTags">Post Tags to Sync</param>
        public void Sync(List<PostTagEntity> postTags)
        {
            _blogContext.PostTags.RemoveRange(_blogContext.PostTags.Where(a=> a.PostId == postTags.FirstOrDefault().PostId));
            _blogContext.AddRange(postTags);
            _blogContext.SaveChanges();
        }
    }
}
