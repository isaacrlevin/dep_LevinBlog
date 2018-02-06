namespace LevinBlog.Model
{
    public class AppConfiguration
    {
        public string SiteTitle { get; set; }
        public string DisqusShortname { get; set; }
        public string SiteUrl { get; set; }
        public string GoogleAnalyticsId { get; set; }
        public string AppInsightsId { get; set; }
        public string Key { get; set; }
        public string SendGridApiKey { get; set; }

        public string AdminEmail { get; set; }
    }
}