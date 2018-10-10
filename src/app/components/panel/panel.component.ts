import { ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';

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

    _scope: paper.PaperScope;

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
}
