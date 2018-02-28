import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, LoginComponent, RegisterComponent, AboutComponent, SearchComponent, PostComponent } from './public/index';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PostResolver, AllPostResolver, CategoryResolver, TagResolver } from './services/post-resolver.service';
import { AboutResolver } from './services/about-resolver.service';

export const metaData = [
  {
    name: 'og:locale', content: 'en_US'
  }, {
    name: 'og:site_name', content: 'IsaacLevin.com'
  }, {
    name: 'twitter:card', content: 'summary'
  }, {
    name: 'twitter:site', content: '@isaac2004'
  },
  {
    name: 'twitter:domain', content: 'Isaac Levin'
  },
  {
    name: 'article:author', content: 'Isaac Levin'
  },
  {
    name: 'og:image', content: 'http://isaaclevin.com/dist/assets/csotW.jpg'
  }
]

export const routes: Routes = [
  {
    path: 'admin', loadChildren: './admin/admin.module#AdminModule',
    data: {
      title: 'Admin',
      meta: metaData
    }
  }
  ,
  {
    path: '', component: HomeComponent,
    data: {
      title: 'Homepage',
      meta: metaData.concat({
        name: 'og:description', content: 'Hi, my name is Isaac Levin and I am a Microsoft Certified Solution Developer, Microsoft Certiied Solution Associate and Microsot Specalist living in Norwalk, CT'
      })
    },
    resolve: {
      posts: AllPostResolver
    }
  },
  {
    path: 'about', component: AboutComponent,
    data: {
      title: 'About',
      meta: metaData.concat({
        name: 'og:description', content: 'Hi, my name is Isaac Levin and I am a Microsoft Certified Solution Developer, Microsoft Certiied Solution Associate and Microsot Specalist living in Norwalk, CT'
      })
    },
    resolve: {
      about: AboutResolver
    }
  },
  {
    path: 'blog', component: PostComponent,
    data: {
      title: 'Post',
      meta: metaData
    },
    resolve: {
      posts: AllPostResolver
    }
  },
  {
    path: 'category', component: PostComponent,
    data: {
      title: 'Category',
      meta: metaData
    },
    resolve: {
      posts: AllPostResolver
    }
  },
  {
    path: 'category/:category', component: PostComponent,
    data: {
      title: 'Category',
      meta: metaData
    },
    resolve: {
      posts: CategoryResolver
    }
  },
  {
    path: 'tag', component: PostComponent,
    data: {
      title: 'Tag',
      meta: metaData
    },
    resolve: {
      posts: AllPostResolver
    }
  },
  {
    path: 'tag/:tag', component: PostComponent,
    data: {
      title: 'Tag',
      meta: metaData
    },
    resolve: {
      posts: TagResolver
    }
  },
  {
    path: 'post', component: PostComponent,
    data: {
      title: 'Post',
      meta: metaData
    },
    resolve: {
      posts: AllPostResolver
    }
  },
  {
    path: 'post/:url', component: PostComponent,
    data: {
      title: 'Post',
      meta: metaData
    },
    resolve: {
      post: PostResolver
    }
  },
  {
    path: 'category/:url', component: PostComponent,
    data: {
      title: 'Category',
      meta: metaData,
    },
    resolve: {
      post: PostResolver
    }
  },
  {
    path: 'search', component: SearchComponent,
    data: {
      title: 'Search',
      meta: metaData
    }
  },
  { path: 'search/:search', component: SearchComponent },
  {
    path: 'login', component: LoginComponent,
    data: {
      title: 'Login',
      meta: metaData
    }
  },
  //{
  //    path: 'register', component: RegisterComponent,
  //    data: {
  //        title: 'Register',
  //        meta: metaData
  //    }
  //},
  {
    path: '**', component: NotFoundComponent,
    data: {
      title: '404 - Not found',
      meta: [{ name: 'description', content: '404 - Error' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PostResolver, AllPostResolver, AboutResolver, CategoryResolver, TagResolver]
})
export class AppRoutingModule { }
