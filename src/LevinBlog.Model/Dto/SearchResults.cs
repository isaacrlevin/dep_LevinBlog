using System.Collections.Generic;

namespace LevinBlog.Model
{
    public class SearchResults
    {
        public SearchResults()
        {
            Posts = new List<Post>();
            TotalMatchingPosts = 1;
        }

        public List<Post> Posts { get; set; }
        public int TotalMatchingPosts { get; set; }
    }
}