import { NgModule, Inject } from '@angular/core';
import { NavMenuComponent } from './shared/navmenu/navmenu.component';
import { AppComponent } from './app.component';
import { HomeComponent, AboutComponent, LoginComponent, RegisterComponent, SearchComponent, PostComponent } from './public/index';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { DisqusModule } from "ngx-disqus";
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AboutComponent,
        SearchComponent,
        NavMenuComponent,
        PostComponent
    ],
    imports: [
        AppRoutingModule,
        CoreModule,
        DisqusModule.forRoot('isaaclevin'),
        SharedModule
    ],
    providers: [
    ]
})
export class AppModuleShared {
}
