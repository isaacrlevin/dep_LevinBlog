using LevinBlog.Database;
using LevinBlog.Database.Entity.Models;
using LevinBlog.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LevinBlog.Repository
{
    public interface IUserRepository
    {
        UserEntity Authenticate(string username, string password);

        IEnumerable<UserEntity> GetAll();

        UserEntity GetById(int id);

        UserEntity Create(UserEntity userEntity, string password);

        void Update(User userEntity, string password = null);

        void Delete(int id);
    }

    public class UserRepository : IUserRepository
    {
        private BlogContext _context;

        public UserRepository(BlogContext context)
        {
            _context = context;
        }

        public UserEntity Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Users.SingleOrDefault(x => x.Username == username);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful
            return user;
        }

        public IEnumerable<UserEntity> GetAll()
        {
            return _context.Users;
        }

        public UserEntity GetById(int id)
        {
            return _context.Users.Find(id);
        }

        public UserEntity Create(UserEntity userEntity, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.Users.Any(x => x.Username == userEntity.Username))
                throw new AppException("Username " + userEntity.Username + " is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            userEntity.PasswordHash = passwordHash;
            userEntity.PasswordSalt = passwordSalt;

            _context.Users.Add(userEntity);
            _context.SaveChanges();

            return userEntity;
        }

        public void Update(User userEntity, string password = null)
        {
            var user = _context.Users.Find(userEntity.Id);

            if (user == null)
                throw new AppException("User not found");

            if (userEntity.Username != user.Username)
            {
                // username has changed so check if the new username is already taken
                if (_context.Users.Any(x => x.Username == userEntity.Username))
                    throw new AppException("Username " + userEntity.Username + " is already taken");
            }

            // update user properties
            user.FirstName = userEntity.FirstName;
            user.LastName = userEntity.LastName;
            user.Username = userEntity.Username;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

        // private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}