import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HomeComponent, AboutComponent, LoginComponent, PostComponent, RegisterComponent, SearchComponent } from './public//index';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './shared/navmenu/navmenu.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { DisqusModule } from 'ngx-disqus';
import { CollapseModule, ModalModule } from 'ngx-bootstrap';
import { SharedModule } from './shared/shared.module';

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
        SharedModule,
        BrowserModule.withServerTransition({
            appId: 'my-app-id' // make sure this matches with your Server NgModule
        }),
        CoreModule,         
        ModalModule.forRoot(),
        CollapseModule.forRoot(),
        DisqusModule.forRoot('isaaclevin'),        
        TransferHttpCacheModule,
        BrowserTransferStateModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModuleShared  {
}
