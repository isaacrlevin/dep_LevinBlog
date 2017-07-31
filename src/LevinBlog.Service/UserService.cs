using LevinBlog.Database.Entity.Models;
using LevinBlog.Repository;
using LevinBlog.Model;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;

namespace LevinBlog.Service
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        void Create(User user, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        void Update(User user, string password);
        void Delete(int id);
    }
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IOptions<AppConfiguration> _appConfiguration;

        public UserService(IUserRepository userRepository,
            IOptions<AppConfiguration> appConfiguration)
        {
            _userRepository = userRepository;
            _appConfiguration = appConfiguration;
        }

        public User Authenticate(string username, string password)
        {
            return Mapper.Map<UserEntity, User>(_userRepository.Authenticate(username, password));
        }

        public void Create(User user, string password)
        {
            _userRepository.Create(Mapper.Map<User,UserEntity>(user), password);
        }

        public void Delete(int id)
        {
            _userRepository.Delete(id);
        }

        public IEnumerable<User> GetAll()
        {
            return Mapper.Map<IEnumerable<UserEntity>, IEnumerable<User>>(_userRepository.GetAll());
        }

        public User GetById(int id)
        {
            return Mapper.Map<UserEntity, User>(_userRepository.GetById(id));
        }

        public void Update(User user, string password)
        {
            _userRepository.Update(user, password);
        }
    }
}
