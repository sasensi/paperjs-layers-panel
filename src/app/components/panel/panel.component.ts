import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
        if (!(scope instanceof paper.PaperScope))
        {
            console.warn('Scope should be a "paper.PaperScope" instance.');
            return;
        }
        this._scope = scope;

        this.addChangeListener();
    }

    _scope: paper.PaperScope;

    @Output() ready = new EventEmitter<PanelComponent>();

    @ViewChild('wrapper') wrapperElement: ElementRef;

    iconClose  = faTimes;
    iconUpdate = faSyncAlt;

    // create an unique identifier for each instance
    // this will be used in automatic scope change detection
    private static instanceCounter = 0;
    private instanceId             = ++PanelComponent.instanceCounter;

    constructor ( private elementRef: ElementRef,
                  private changeDetectorRef: ChangeDetectorRef )
    {
        // use an empty timeout as a trick to handle imediately listening
        // to ready event after element creation case
        setTimeout(() => this.ready.emit(this), 0);

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
        // by default, set global paper as scope
        else
        {
            this.scope = paper;
        }
    }


    //
    // API
    //

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
        // remove change listener
        this.removeChangeListener();

        // remove element
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


    //
    // INTERNAL
    //

    private addChangeListener ()
    {
        var scope = this._scope as any;

        // can't patch a scope with no project
        if (!scope.project)
        {
            return;
        }

        // if scope is not patched yet
        if (!scope._layersPanelListeners)
        {
            // create stack
            scope._layersPanelListeners = {};

            // patch changed method
            var originalMethod = scope.project._changed;

            // when called
            scope.project._changed = function ( flags, item )
            {
                // call original method
                originalMethod.apply(this, arguments);
                // then call panels callbacks if change is related to panel content
                // todo: check flags
                if (true)
                {
                    for (let key in scope._layersPanelListeners)
                    {
                        scope._layersPanelListeners[ key ](item);
                    }
                }
            };
        }

        // if not already listening
        if (!(this.instanceId in scope._layersPanelListeners))
        {
            // listen for changes
            scope._layersPanelListeners[ this.instanceId ] = ( item ) =>
            {
                // todo: update only targeted item
                this.update();
            };
        }
    }

    private removeChangeListener ()
    {
        var scope = this._scope as any;

        if (scope._layersPanelListeners && this.instanceId in scope._layersPanelListeners)
        {
            delete scope._layersPanelListeners[ this.instanceId ];
        }
    }
}
