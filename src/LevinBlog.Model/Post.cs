using System;
using System.Collections.Generic;
using System.Text;

namespace LevinBlog.Model
{
    /// <summary>
    /// Identifies position in previous, current and
    /// next collection when getting a single post with meta
    /// </summary>
    public enum PreviousCurrentNextPosition
    {
        Previous = 0,
        Current,
        Next
    }

    public class Post : BaseModel
    {
        public Post()
        {
            Tags = new List<Tag>();
            Category = new Category();
            Article = new Article();
            Excerpt = new Excerpt();
        }

        public string Title { get; set; }

        public string Description { get; set; }
        public string Url { get; set; }

        public string Link { get; set; }

        public Article Article { get; set; }

        public Excerpt Excerpt { get; set; }
        public string Image { get; set; }
        public string SmallImage { get; set; }
        public string IconImage { get; set; }

        public DateTime PostedOn { get; set; }

        public bool Published { get; set; }

        public IEnumerable<Tag> Tags { get; set; }
        public Category Category { get; set; }
    }
}
