import { NgModule, Inject } from '@angular/core';
import { NavMenuComponent } from './shared/navmenu/navmenu.component';
import { AppComponent } from './app.component';
import { HomeComponent, AboutComponent, LoginComponent, RegisterComponent, SearchComponent, PostComponent } from './public/index';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { DisqusModule } from "ngx-disqus";
import { CollapseModule, ModalModule } from 'ngx-bootstrap';
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
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    DisqusModule.forRoot('isaaclevin'),
    SharedModule,
    BrowserModule.withServerTransition({
      appId: 'my-app-id' // make sure this matches with your Server NgModule
    }),
  ],
  providers: [
  ]
})
export class AppModuleShared {
}
