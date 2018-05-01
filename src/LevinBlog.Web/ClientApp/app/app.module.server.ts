import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppModuleShared } from './app.module';
import { AppComponent } from './app.component';

import { ServerPrebootModule } from 'preboot/server';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppModuleShared,
    ServerModule,
    ServerTransferStateModule,
    ServerPrebootModule.recordEvents({ appRoot: 'app-root' }),
    NoopAnimationsModule
  ]
})
export class AppModule   {

  constructor() { }

}
