# THIS REPO IS NO LONGER IN USE OR BEING MAINTAINED. THERE ARE INTERESTING SNIPPETS AROUND SSR WITH ANGULAR AND .NET CORE, BUT ISAACLEVIN.COM IS NOW A STATIC SITE HOSTED IN AZURE BLOB STORAGE


# LevinBlog
Code for blog located at isaaclevin.com

Current stack...
- ASP.NET Core 2.1
- Entity Framework Core 2.1
- Angular 5.2.10
- Bootstrap 4
- Webpack 2.2.0

Current deployment...
- Site and SQL Database hosted in Azure


## Setup

### Repository
Clone the repository to your local environment.

```bash
git clone https://github.com/isaac2004/LevinBlog.git
```

### Configuration
All configuration is derived from `appsettings.json`. That being said, it is recommended you create an `appsettings.development.json`  and `appsettings.production.json` file to override these settings.

### Database

- Update the connection string inside of `LevinBlog.Web\appsettings.json` & `LevinBlog.Database\BlogContextFactory.cs`.
- Set LevinBlog.DataGenerator as Startup project
- Open Package Manager Console, set LevinBlog.Database as Default project
- Run Add-Migration 'some name'
- Run Update-Database

At this point, a database and all corresponding tables should have been created in your database instance. 

### Front-end

Install [node](https://nodejs.org/en/) on your local environment and run the following.

Navigate to the `LevinBlog.Web` directory from your command prompt and run....
- `npm install`
- `npm rebuild node-sass --force`

### Run

That is it! You now should be able to build and launch the project from your IDE of choosing.  


### Projects I "Borrowed" From
- [PioneerBlog](https://github.com/PioneerCode/pioneer-blog)
- [ASP.Net Starter w/ SEO](https://github.com/MarkPieszak/aspnetcore-angular2-universal)

## What Is Next

- If your curious about enhancements to this site, I track features as [isuses](https://github.com/isaac2004/LevinBlog/issues).
