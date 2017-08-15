import { NgModule, Inject } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { ORIGIN_URL } from '../shared/constants/baseurl.constants';
import { TransferHttpModule } from '../../modules/transfer-http/transfer-http.module';
import { SafeHtmlPipe } from './safehtml.pipe';
import { TruncatePipe } from './truncate.pipe';
import { LoaderComponent } from './loader.component';
import { BlogComponent } from './blog/blog.component';
import { FooterComponent } from './footer/footer.component';
import { Ng2BootstrapModule, CollapseModule, ModalModule } from 'ngx-bootstrap';
import { HighlightJsService } from 'angular2-highlight-js';
import { FormsModule } from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
    declarations: [
        BlogComponent,
        FooterComponent,
        LoaderComponent,
        SafeHtmlPipe,
        TruncatePipe,
        NotFoundComponent,
        // BrowserAnimationsModule
    ],
    imports: [
        CommonModule,
        TransferHttpModule,
        Ng2BootstrapModule,
        ModalModule.forRoot(),
        CollapseModule.forRoot(),
        FormsModule
    ],
    providers: [
        HighlightJsService
    ],
    exports: [
        CommonModule,
        TransferHttpModule,
        SafeHtmlPipe,
        TruncatePipe,
        BlogComponent,
        FooterComponent,
        LoaderComponent,
        NotFoundComponent,
        Ng2BootstrapModule
    ]
})
export class SharedModule { }
