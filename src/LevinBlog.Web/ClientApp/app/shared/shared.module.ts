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
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
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
    TransferHttpCacheModule,
    BrowserTransferStateModule
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
    NotFoundComponent
  ]
})
export class SharedModule { }
