import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { faSyncAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DEFAULT_PANEL_OPTIONS } from '../../constants/default-panel-options.constant';
import { PanelOptions } from '../../types/panel-options.type';

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
    @Input() options: PanelOptions = Object.assign({}, DEFAULT_PANEL_OPTIONS);

    @Input() set project ( project )
    {
        this._project = project;
        this.addChangeListener();
        this.update();
    }

    get project ()
    {
        return this._project;
    }

    _project: paper.Project;

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

    get element(): HTMLElement
    {
        return this.elementRef.nativeElement;
    }


    //
    // INTERNAL
    //

    private addChangeListener ()
    {
        var project = this._project as any;

        // if scope is not patched yet
        if (!project._layersPanelListeners)
        {
            // create stack
            project._layersPanelListeners = {};

            // patch changed method
            var originalMethod = project._changed;

            // when called
            project._changed = function ( flags, item )
            {
                // call original method
                originalMethod.apply(this, arguments);
                // then call panels callbacks if change is related to panel content
                // todo: check flags
                if (true)
                {
                    for (let key in project._layersPanelListeners)
                    {
                        project._layersPanelListeners[ key ](item);
                    }
                }
            };
        }

        // if not already listening
        if (!(this.instanceId in project._layersPanelListeners))
        {
            // listen for changes
            project._layersPanelListeners[ this.instanceId ] = ( item ) =>
            {
                // todo: update only targeted item
                this.update();
            };
        }
    }

    private removeChangeListener ()
    {
        var project = this._project as any;

        if (project._layersPanelListeners && this.instanceId in project._layersPanelListeners)
        {
            delete project._layersPanelListeners[ this.instanceId ];
        }
    }
}
