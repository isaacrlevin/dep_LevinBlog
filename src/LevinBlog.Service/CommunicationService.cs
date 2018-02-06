using AutoMapper;
using LevinBlog.Database.Entity;
using LevinBlog.Model;
using LevinBlog.Repository;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;

namespace LevinBlog.Service
{
    public interface ICommunicationService
    {
        OperationResult<ContactViewModel> SendContactEmailNotification(ContactViewModel model);

        OperationResult<Contact> SignUpToMailingList(SignUpViewModel model);
    }

    public class CommunicationService : ICommunicationService
    {
        private readonly IOptions<AppConfiguration> _appConfiguration;
        private readonly IContactRepository _contactRepository;

        public CommunicationService(IOptions<AppConfiguration> appConfiguration, IContactRepository contactRepository)
        {
            _appConfiguration = appConfiguration;
            _contactRepository = contactRepository;
        }

        /// <summary>
        /// When an notification email that someone is trying to contact you.
        /// </summary>
        public OperationResult<ContactViewModel> SendContactEmailNotification(ContactViewModel model)
        {
            //var sender = new SendGridSender(_appConfiguration.Value.SendGridApiKey);
            //Email.DefaultSender = sender;
            //Email.DefaultRenderer = new RazorRenderer();

            //var template = "<p>Email From: @Model.Name (@Model.Email)</p><p>Message:</p><p>@Model.Message</p>";

            //var email = Email.From(_appConfiguration.Value.NoReplyEmail, $"{_appConfiguration.Value.SiteTitle} - Contact")
            //                 .To(_appConfiguration.Value.AdminEmail)
            //                 .Subject($"{ _appConfiguration.Value.SiteTitle} - Contact: {model.Subject}")
            //             .UsingTemplate(template, model, true);
            try
            {
                //email.Send();
                return new OperationResult<ContactViewModel>(model, OperationStatus.Ok);
            }
            catch (Exception)
            {
                // TODO: Log
                return new OperationResult<ContactViewModel>(model, OperationStatus.Error);
            }
        }

        /// <summary>
        /// Sign someone up to the mailing list.
        /// </summary>
        public OperationResult<Contact> SignUpToMailingList(SignUpViewModel model)
        {
            if (_contactRepository.GetByEmail(model.Email) != null)
            {
                return new OperationResult<Contact>(null, OperationStatus.Error, "This email has already been added to the mailing list.");
            }

            var response = _contactRepository.Add(Mapper.Map<Contact, ContactEntity>(new Contact { Email = model.Email }));

            if (response != null)
            {
                var apiKey = (_appConfiguration.Value.SendGridApiKey);
                var client = new SendGridClient(apiKey);
                var from = new EmailAddress(_appConfiguration.Value.AdminEmail, "Levin Blog Admin");
                var subject = $"Welcome to {_appConfiguration.Value.SiteTitle}.";
                var to = new EmailAddress(model.Email);
                var plainTextContent = $"Dear {model.Email}, Thank you for signing up for Levin Blog, here is the url {_appConfiguration.Value.SiteUrl}";
                var htmlContent = $"Dear {model.Email}, Thank you for signing up for Levin Blog, here is the url {_appConfiguration.Value.SiteUrl}";
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                client.SendEmailAsync(msg).Wait();
            }
            return new OperationResult<Contact>(Mapper.Map<ContactEntity, Contact>(response), OperationStatus.Created);
        }
    }
}