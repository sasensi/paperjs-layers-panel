import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { faSyncAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * Main component that display a layers panel according to bound PaperScope.
 * Handle properties bindings and API methods.
 * Allow user to:
 * - update display
 * - move panel
 * - resize panel
 * - reset panel size
 * - close panel
 */
@Component({
    templateUrl: './panel.component.html',
    styleUrls  : [ './panel.component.scss' ],
})
export class PanelComponent
{
    // scope is bound with a setter to be enable to check type
    @Input() set scope ( scope )
    {
        // only check instance type if global paper variable is available
        if (paper && !(scope instanceof paper.PaperScope))
        {
            console.warn('Scope should be a "paper.PaperScope" instance.');
            return;
        }
        this._scope = scope;
    }
    _scope: paper.PaperScope;

    @ViewChild('wrapper') wrapperElement: ElementRef;

    iconClose  = faTimes;
    iconUpdate = faSyncAlt;

    constructor ( private elementRef: ElementRef,
                  private changeDetectorRef: ChangeDetectorRef )
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

    /**
     * Update panel display.
     */
    update ()
    {
        this.changeDetectorRef.detectChanges();
    }

    /**
     * Close panel.
     * Completely remove element from DOM.
     */
    close ()
    {
        this.elementRef.nativeElement
            .parentElement
            .removeChild(this.elementRef.nativeElement);
    }

    /**
     * Reset panel to its original size.
     * Clear effects of UI resizing.
     */
    resetSize ()
    {
        if (!this.wrapperElement)
        {
            return;
        }

        var el: HTMLElement = this.wrapperElement.nativeElement;

        // remove inline styles added by resizable directive
        el.style.removeProperty('width');
        el.style.removeProperty('height');
    }
}
