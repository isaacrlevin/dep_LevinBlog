using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace LevinBlog.Database.Entity.Models
{
    [Table("Articles")]
    public class ArticleEntity
    {
        [Key]
        public int Id { get; set; }
        [Display(Name = "Article")]
        public string Content { get; set; }
    }
}
