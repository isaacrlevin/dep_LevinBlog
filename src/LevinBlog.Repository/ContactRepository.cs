using LevinBlog.Database;
using LevinBlog.Database.Entity;
using System.Linq;

namespace LevinBlog.Repository
{
    public interface IContactRepository
    {
        ContactEntity Add(ContactEntity contactEntity);
        ContactEntity GetByEmail(string email);
    }

	public class ContactRepository : IContactRepository
    {
        private readonly BlogContext _blogContext;

        public ContactRepository(BlogContext blogContext)
        {
            _blogContext = blogContext;
        }
        /// <summary>
        /// Add Entity
        /// </summary>
        /// <param name="contactEntity">Entity for Contact</param>
        /// <returns></returns>
        public ContactEntity Add(ContactEntity contactEntity)
        {
            _blogContext
                .Contacts
                .Add(contactEntity);
            _blogContext.SaveChanges();

            return contactEntity;
        }

        /// <summary>
        /// Get by email address
        /// </summary>
        /// <param name="email"></param>
        /// <returns>Contact Entity</returns>
        public ContactEntity GetByEmail(string email)
        {
            return _blogContext
                    .Contacts
                    .FirstOrDefault(x => x.Email == email);
        }
    }
}