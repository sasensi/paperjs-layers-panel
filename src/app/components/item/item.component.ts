import { ChangeDetectorRef, Component, Input } from '@angular/core';
import {
    faCaretDown,
    faCaretRight,
    faEye,
    faEyeSlash,
    faLock,
    faTrash,
    faUnlockAlt,
    faVectorSquare,
} from '@fortawesome/free-solid-svg-icons';
import { DEFAULT_PANEL_OPTIONS } from '../../constants/default-panel-options.constant';
import { ItemsOptions } from '../../types/items-options.type';

/**
 * Displays an item and its potential children.
 * Allow to:
 * - toggle visibillity
 * - toggle locked state
 * - toggle selected state
 * - expand / collape children
 * - remove item
 */
@Component({
    selector   : 'paperjs-layer-panel-item',
    templateUrl: './item.component.html',
    styleUrls  : [ './item.component.scss' ],
})
export class ItemComponent
{
    @Input() set item ( item )
    {
        this._item = item;
    }

    _item: paper.Item;

    @Input() options: ItemsOptions = Object.assign({}, DEFAULT_PANEL_OPTIONS.items);

    // used to controll horizontal offset according to item depth in hierarchy
    @Input() depth = 0;

    expanded;

    iconVisible     = faEye;
    iconNotVisible  = faEyeSlash;
    iconLocked      = faLock;
    iconNotLocked   = faUnlockAlt;
    iconExpanded    = faCaretDown;
    iconNotExpanded = faCaretRight;
    iconSelected    = faVectorSquare;
    iconDelete      = faTrash;

    constructor ( private changeDetectorRef: ChangeDetectorRef )
    {
    }

    get hasChildren (): boolean
    {
        return this._item.children && this._item.children.length > 0;
    }

    get childrenVisible (): boolean
    {
        if (!this.options.expandable)
        {
            return this.options.expanded;
        }
        else
        {
            return this.expanded !== false && (this.expanded === true || this.options.expanded);
        }
    }

    update ()
    {
        this.changeDetectorRef.detectChanges();
    }
}
