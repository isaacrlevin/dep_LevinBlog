import { NgModule, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthenticationService, AboutService, SearchService, LoadingService, LinkService, CategoryService, PostService, PostTagService, SignupService, UserService, AlertService, TagService, JWTInterceptor } from '../services/index';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    AuthenticationService,
    CategoryService,
    PostService,
    PostTagService,
    SignupService,
    UserService,
    AlertService,
    TagService,
    LinkService,
    SearchService,
    LoadingService,
    AboutService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    }
  ],
  exports: [
    HttpClientModule,
    TransferHttpCacheModule,
    BrowserTransferStateModule,
    FormsModule,
    RouterModule,
  ]
})
export class CoreModule {
}
