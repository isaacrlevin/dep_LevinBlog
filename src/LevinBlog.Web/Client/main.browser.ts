import './polyfills/browser.polyfills';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAppModule } from './app/browser-app.module';

const rootElemTagName = 'app'; // Update this if you change your root component selector

if (module['hot']) {
    module['hot'].accept(); module['hot'].accept();
    module['hot'].dispose(() => {
        module['hot'].dispose(() => {
            modulePromise.then(appModule => appModule.destroy()); modulePromise.then(appModule => appModule.destroy());
        });
    });
} else {
    enableProdMode();
}

const modulePromise = platformBrowserDynamic().bootstrapModule(BrowserAppModule);
