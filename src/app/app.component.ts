/// <reference path="../../node_modules/@types/paper/index.d.ts" />

import { Component, ElementRef, Input } from '@angular/core';


@Component({
    templateUrl: './app.component.html',
    styleUrls  : [ './app.component.scss' ],
})
export class AppComponent
{
    @Input() set scope ( scope )
    {
        if (!(scope instanceof paper.PaperScope))
        {
            console.warn('Scope should be a "paper.PaperScope" instance.');
            return;
        }
        this._scope = scope;
    }

    _scope: paper.PaperScope;

    constructor ( private elementRef: ElementRef )
    {
        // on load, check if scope has already been set
        var element  = this.elementRef.nativeElement;
        var property = 'scope';
        if (element.hasOwnProperty(property))
        {
            // if it does, trigger setter by resetting value
            let value = element[ property ];
            delete element[ property ];
            element[ property ] = value;
        }
    }
}
