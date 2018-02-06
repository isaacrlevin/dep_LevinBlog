using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LevinBlog.Database.Entity.Models
{
    [Table("Excerpts")]
    public class ExcerptEntity
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Excerpt")]
        [StringLength(500)]
        public string Content { get; set; }
    }
}