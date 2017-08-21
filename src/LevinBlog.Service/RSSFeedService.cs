using LevinBlog.Model;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Linq;

namespace LevinBlog.Service
{
    public interface IRSSFeedService
    {
        string GetRSSFeed();
    }

    public class RSSFeedService : IRSSFeedService
    {
        private readonly IPostService _postService;
        private readonly ITagService _tagService;
        private readonly ICategoryService _categoryService;
        private readonly IOptions<AppConfiguration> _config;

        public RSSFeedService(IPostService postService,
            ITagService tagService,
            ICategoryService categoryService,
            IOptions<AppConfiguration> config)
        {
            _postService = postService;
            _tagService = tagService;
            _categoryService = categoryService;
            _config = config;
        }
        public string GetRSSFeed()
        {
            var doc = new XDocument(new XElement("rss"));
            doc.Root.Add(new XAttribute("version", "2.0"));

            var channel = new XElement("channel");
            channel.Add(new XElement("title", _config.Value.SiteUrl));
            channel.Add(new XElement("link",$"{_config.Value.SiteUrl}/rssfeed.xml"));
            channel.Add(new XElement("description", "Incessant Ramblings of a Cloud Enthusiast"));
            channel.Add(new XElement("copyright", DateTime.Now.Year));
            doc.Root.Add(channel);

            foreach (var post in _postService.GetAll(false, false))
            {
                var itemElement = new XElement("item");
                itemElement.Add(new XElement("title", post.Title));
                itemElement.Add(new XElement("link", $"{_config.Value.SiteUrl}/post/{post.Url}"));
                itemElement.Add(new XElement("description", post.Description));
                itemElement.Add(new XElement("category", post.Category.Name));
                foreach (var c in post.Tags) itemElement.Add(new XElement("tag", c.Name));

                var dateFmt = post.PostedOn.ToString("r");
                if (post.PostedOn != DateTime.MinValue) itemElement.Add(new XElement("pubDate", dateFmt));
                channel.Add(itemElement);
            }

            return doc.ToString();
        }
    }
}
