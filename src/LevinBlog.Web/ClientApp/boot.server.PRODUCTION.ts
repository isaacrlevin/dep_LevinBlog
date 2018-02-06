import 'zone.js/dist/zone-node';
import './polyfills/server.polyfills';
import { enableProdMode } from '@angular/core';
import { createServerRenderer } from 'aspnet-prerendering';

// Grab the (Node) server-specific NgModule
const { AppModuleNgFactory } = require('./app/app.module.server.ngfactory'); // <-- ignore this - this is Production only
import { ngAspnetCoreEngine, IEngineOptions, createTransferScript } from '@nguniversal/aspnetcore-engine';

enableProdMode();

export default createServerRenderer((params) => {
  // Platform-server provider configuration
  const setupOptions: IEngineOptions = {
    appSelector: '<app-root></app-root>',
    ngModule: AppModuleNgFactory,
    request: params,
    providers: [
      // Optional - Any other Server providers you want to pass
      // (remember you'll have to provide them for the Browser as well)
    ]
  };

  return ngAspnetCoreEngine(setupOptions).then(response => {
    // Apply your transferData to response.globals
    response.globals.transferData = createTransferScript({
      AppInsightsId: params.data.appInsightsId,
      DiscusShortName: params.data.discusShortName
    });

    return ({
      html: response.html, // our <app-root> serialized
      globals: response.globals // all of our styles/scripts/meta-tags/link-tags for aspnet to serve up
    });
  });
});
