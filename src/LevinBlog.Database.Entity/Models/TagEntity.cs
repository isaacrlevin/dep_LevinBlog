using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace LevinBlog.Database.Entity
{
    [Table("Tags")]
    public class TagEntity : BaseEntity
    {
        [MaxLength(100)]
        [StringLength(100)]
        public string Name { get; set; }

        [MaxLength(100)]
        [StringLength(100)]
        public string Url { get; set; }

        public IList<PostTagEntity> Posts { get; set; }
    }
}
