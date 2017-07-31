using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Antiforgery;

using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.NodeServices;
using LevinBlog.Database;
using LevinBlog.Model;
using LevinBlog.Repository;
using LevinBlog.Service;
using Microsoft.DotNet.PlatformAbstractions;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.Net.Http.Headers;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using Pioneer.Blog.Service;

namespace LevinBlog.Web
{
  public class Startup
  {
    public static void Main()
    {
      var host = new WebHostBuilder()
          .UseKestrel()
            .ConfigureLogging(factory =>
            {
              factory.AddConsole();
              factory.AddDebug();
            })
          .UseContentRoot(Directory.GetCurrentDirectory())
          .UseIISIntegration()
          .UseStartup<Startup>()
          .Build();

      host.Run();
    }

    public Startup(IHostingEnvironment env)
    {
      var builder = new ConfigurationBuilder()
          .SetBasePath(env.ContentRootPath)
          .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
          .AddEnvironmentVariables();
      Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      // Add framework services.
      services.AddCors();
      services.AddMvc();
      services.AddNodeServices();

      services.AddDbContext<BlogContext>(options =>
               options.UseSqlServer(Configuration.GetConnectionString("BlogDatabase")));

      services.Configure<AppConfiguration>(Configuration.GetSection("AppConfiguration"));

      // configure DI for application services
      // Repositories
      services.AddTransient<IContactRepository, ContactRepository>();
      services.AddTransient<ICategoryRepository, CategoryRepository>();
      services.AddTransient<ITagRepository, TagRepository>();
      services.AddTransient<IPostRepository, PostRepository>();
      services.AddTransient<IPostTagRepository, PostTagRepository>();
      services.AddTransient<IUserRepository, UserRepository>();
      // Services
      services.AddTransient<ICategoryService, CategoryService>();
      services.AddTransient<IPostService, PostService>();
      services.AddTransient<IPostTagService, PostTagService>();
      services.AddTransient<ISearchService, SearchService>();
      services.AddTransient<ICommunicationService, CommunicationService>();
      services.AddTransient<ITagService, TagService>();
      services.AddTransient<IUserService, UserService>();
      //services.AddTransient<ApplicationEnvironment>();
      //services.AddTransient<HostingEnvironment>();

      services.AddAuthentication(options =>
      {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      });

      services.AddJwtBearerAuthentication(o =>
      {
        o.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          ValidateIssuer = false,
          ValidateAudience = false,
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["AppConfiguration:Key"])),
        };
        o.Events = new JwtBearerEvents()
        {
          OnAuthenticationFailed = c =>
          {
            c.HandleResponse();

            c.Response.StatusCode = 500;
            c.Response.ContentType = "text/plain";
            return c.Response.WriteAsync("An error occurred processing your authentication.");
          }
        };
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      // global cors policy
      app.UseCors(x => x
          .AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader()
          .AllowCredentials());

      app.UseStaticFiles(new StaticFileOptions
      {
        OnPrepareResponse = context =>
        {
          var headers = context.Context.Response.GetTypedHeaders();
          headers.CacheControl = new CacheControlHeaderValue
          {
            MaxAge = TimeSpan.FromSeconds(31536000)
          };
        }
      });

      ServiceMapperConfig.Config();
      app.UseAuthentication();

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
        {
          HotModuleReplacement = true
        });

        app.UseMvc(routes =>
        {
          routes.MapRoute(
              name: "default",
              template: "{controller=Home}/{action=Index}/{id?}");

          routes.MapSpaFallbackRoute(
              name: "spa-fallback",
              defaults: new { controller = "Home", action = "Index" });
        });
        app.UseExceptionHandler("/Home/Error");
      }
    }
  }
}
