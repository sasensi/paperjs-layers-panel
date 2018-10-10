import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector   : 'app-item',
    templateUrl: './item.component.html',
    styleUrls  : [ './item.component.scss' ],
})
export class ItemComponent implements OnInit
{
    @Input() item: paper.Item;

    childrenVisible = false;

    constructor ()
    {
    }

    ngOnInit ()
    {
    }

    get selectedColor(): string
    {
        return this.item.selectedColor && (this.item.selectedColor as paper.Color).toCSS(true) || '#009dec';
    }

    get hasChildren(): boolean
    {
        return this.item.children && this.item.children.length > 0;
    }
}
