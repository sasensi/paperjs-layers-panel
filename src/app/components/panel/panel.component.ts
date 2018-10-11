import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { faSyncAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    templateUrl: './panel.component.html',
    styleUrls  : [ './panel.component.scss' ],
})
export class PanelComponent
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

    @ViewChild('wrapper') wrapperElement: ElementRef;

    _scope: paper.PaperScope;

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

    update ()
    {
        this.changeDetectorRef.detectChanges();
    }

    close ()
    {
        this.elementRef.nativeElement
            .parentElement
            .removeChild(this.elementRef.nativeElement);
    }

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
