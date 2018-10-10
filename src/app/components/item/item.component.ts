import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector   : 'app-item',
    templateUrl: './item.component.html',
    styleUrls  : [ './item.component.scss' ],
})
export class ItemComponent implements OnInit
{
    @Input() item: paper.Item;

    constructor ()
    {
    }

    ngOnInit ()
    {
    }

    get selectedColor()
    {
        return this.item.selectedColor && (this.item.selectedColor as paper.Color).toCSS(true) || '#009dec';
    }
}
