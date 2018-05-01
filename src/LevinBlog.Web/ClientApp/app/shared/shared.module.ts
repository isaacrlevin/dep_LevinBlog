import { NgModule, Inject } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { SafeHtmlPipe } from './safehtml.pipe';
import { TruncatePipe } from './truncate.pipe';
import { LoaderComponent } from './loader.component';
import { BlogComponent } from './blog/blog.component';
import { FooterComponent } from './footer/footer.component';
import { CollapseModule, ModalModule } from 'ngx-bootstrap';
import { HighlightJsService } from 'angular2-highlight-js';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    BlogComponent,
    FooterComponent,
    LoaderComponent,
    SafeHtmlPipe,
    TruncatePipe,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    HighlightJsService
  ],
  exports: [
    CommonModule,
    SafeHtmlPipe,
    TruncatePipe,
    BlogComponent,
    FooterComponent,
    LoaderComponent,
    NotFoundComponent,
    RouterModule
  ]
})
export class SharedModule { }
