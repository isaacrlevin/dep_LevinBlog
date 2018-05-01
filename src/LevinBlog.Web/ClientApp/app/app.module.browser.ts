import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationInsightsModule, AppInsightsService } from '@markpieszak/ng-application-insights';
import { ORIGIN_URL, REQUEST } from '@nguniversal/aspnetcore-engine/tokens';
import { AppModuleShared } from './app.module';
import { AppComponent } from './app.component';
import { BrowserPrebootModule } from 'preboot/browser';

export function getOriginUrl() {
  return window.location.origin;
}

export function getRequest() {
  // the Request object only lives on the server
  return { cookie: document.cookie };
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserPrebootModule.replayEvents(),
    BrowserAnimationsModule,
    ApplicationInsightsModule.forRoot({
      instrumentationKey: window['TRANSFER_CACHE']['AppInsightsId']
    }),

    // Our Common AppModule
    AppModuleShared

  ],
  providers: [
    AppInsightsService,
    {
      provide: ORIGIN_URL,
      useFactory: (getOriginUrl)
    }, {
      provide: REQUEST,
      useFactory: (getRequest)
    }
  ]
})
export class AppModule  { }
