import { Component, Input } from '@angular/core';
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
    @Input() item: paper.Item;

    // used to controll horizontal offset according to item depth in hierarchy
    @Input() depth = 0;

    childrenVisible = false;

    iconVisible            = faEye;
    iconNotVisible         = faEyeSlash;
    iconLocked             = faLock;
    iconNotLocked          = faUnlockAlt;
    iconChildrenVisible    = faCaretDown;
    iconChildrenNotVisible = faCaretRight;
    iconSelected           = faVectorSquare;
    iconDelete             = faTrash;

    get hasChildren (): boolean
    {
        return this.item.children && this.item.children.length > 0;
    }
}
