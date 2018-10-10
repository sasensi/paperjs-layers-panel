import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { ItemComponent } from './components/item/item.component';
import { PanelComponent } from './components/panel/panel.component';


@NgModule({
    declarations   : [ PanelComponent, ItemComponent ],
    imports        : [ BrowserModule ],
    entryComponents: [ PanelComponent ],
})
export class AppModule
{
    constructor ( private injector: Injector )
    {
        customElements.define('paperjs-layer-panel', createCustomElement(PanelComponent, { injector }));
    }

    ngDoBootstrap ()
    {
    }
}
