import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { AuthenticationService, AboutService, SearchService, LoadingService, LinkService, CategoryService, PostService, PostTagService, SignupService, UserService, AlertService, TagService, JWTInterceptor } from '../services/index';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
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
    FormsModule
  ]
})
export class CoreModule {
}
