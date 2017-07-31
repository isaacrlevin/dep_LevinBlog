using System.Linq;
using LevinBlog.Database;
using LevinBlog.Repository;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace LevinBlog.Tests.RepositoryTests
{
    [TestClass]
    public class BlogServiceTests
    {
        [TestMethod]
        public void Add_writes_to_database()
        {
            // In-memory database only exists while the connection is open
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            try
            {
                var options = new DbContextOptionsBuilder<BlogContext>()
                    .UseSqlite(connection)
                    .Options;

                // Create the schema in the database
                using (var context = new BlogContext(options))
                {
                    context.Database.EnsureCreated();
                }

                // Run the test against one instance of the context
                using (var context = new BlogContext(options))
                {
                    var service = new PostRepository(context);
                    service.Add(new Database.Entity.PostEntity
                    {
                         Title = "This is a test post!!!"
                    });
                }

                // Use a separate instance of the context to verify correct data was saved to database
                using (var context = new BlogContext(options))
                {
                    Assert.AreEqual(1, context.Posts.Count());
                    Assert.AreEqual("This is a test post!!!", context.Posts.Single().Title);
                }
            }
            finally
            {
                connection.Close();
            }
        }

        [TestMethod]
        public void Find_searches_url()
        {
            // In-memory database only exists while the connection is open
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            try
            {
                var options = new DbContextOptionsBuilder<BlogContext>()
                    .UseSqlite(connection)
                    .Options;

                // Create the schema in the database
                using (var context = new BlogContext(options))
                {
                    context.Database.EnsureCreated();
                }

                // Insert seed data into the database using one instance of the context
                using (var context = new BlogContext(options))
                {
                    context.Posts.Add(new Database.Entity.PostEntity { Title = "Test Post 1" });
                    context.Posts.Add(new Database.Entity.PostEntity { Title = "Test Post 2" });
                    context.Posts.Add(new Database.Entity.PostEntity { Title = "Test Post 3" });
                    context.SaveChanges();
                }

                // Use a clean instance of the context to run the test
                using (var context = new BlogContext(options))
                {
                    var service = new PostRepository(context);
                    var result = service.GetAll(true, true, true);
                    Assert.AreEqual(3, result.Count());
                }
            }
            finally
            {
                connection.Close();
            }
        }
    }
}