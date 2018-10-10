import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularDraggableModule } from 'angular2-draggable';
import { ItemComponent } from './components/item/item.component';
import { PanelComponent } from './components/panel/panel.component';

@NgModule({
    declarations   : [ PanelComponent, ItemComponent ],
    imports        : [
        BrowserModule,
        AngularDraggableModule,
        FontAwesomeModule,
    ],
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
