/// <reference path="paper.d.ts" />

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { paperjsLayersPanel } from './app/paperjs-layers-panel';
import { environment } from './environments/environment';

if (environment.production)
{
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

// expose object
(window as any).paperjsLayersPanel = paperjsLayersPanel;
