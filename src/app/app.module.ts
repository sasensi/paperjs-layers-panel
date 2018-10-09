import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';


@NgModule({
    declarations   : [ AppComponent ],
    imports        : [ BrowserModule ],
    entryComponents: [ AppComponent ],
})
export class AppModule
{
    constructor ( private injector: Injector )
    {
        customElements.define('paperjs-layer-panel', createCustomElement(AppComponent, { injector }));
    }

    ngDoBootstrap ()
    {
    }
}
