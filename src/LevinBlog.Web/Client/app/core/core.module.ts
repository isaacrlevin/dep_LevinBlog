import { NgModule, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AuthenticationService, AboutService ,SearchService, LoadingService, LinkService, CategoryService, PostService, PostTagService, SignupService, UserService, AlertService, TagService } from '../services/index';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        HttpModule,
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
        AboutService
    ],
    exports: [
        HttpModule,
        FormsModule,
        RouterModule,
    ]
})
export class CoreModule {
}
