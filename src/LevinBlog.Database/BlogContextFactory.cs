using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace LevinBlog.Database
{
    public class BlogContextFactory : IDesignTimeDbContextFactory<BlogContext>
    {
        public BlogContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<BlogContext>();
            builder.UseSqlServer(
                "Server=localhost;Database=LevinBlog;Trusted_Connection=True;MultipleActiveResultSets=true");

            return new BlogContext(builder.Options);
        }
    }
}
