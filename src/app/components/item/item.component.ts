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

}
