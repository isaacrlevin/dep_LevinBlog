using LevinBlog.Database.Entity;
using LevinBlog.Database.Entity.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace LevinBlog.Database
{
    public class BlogContext : DbContext
    {
        public BlogContext(DbContextOptions<BlogContext> options) : base(options)
        {
        }

        public DbSet<ContactEntity> Contacts { get; set; }
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<PostEntity> Posts { get; set; }
        public DbSet<PostTagEntity> PostTags { get; set; }
        public DbSet<TagEntity> Tags { get; set; }
        public DbSet<CategoryEntity> Categories { get; set; }
        public DbSet<ArticleEntity> Articles { get; set; }
        public DbSet<ExcerptEntity> Excerpts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            AddAuitInfo();
            return base.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            AddAuitInfo();
            return await base.SaveChangesAsync();
        }

        private void AddAuitInfo()
        {
            var entries = ChangeTracker.Entries().Where(x => x.Entity is BaseEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));
            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    ((BaseEntity)entry.Entity).CreatedOn = DateTime.UtcNow;
                }
            ((BaseEntity)entry.Entity).ModifiedOn = DateTime.UtcNow;
            }
        }
    }
}