import { PanelComponent } from './components/panel/panel.component';
import { DEFAULT_PANEL_OPTIONS } from './constants/default-panel-options.constant';
import { PanelOptions } from './types/panel-options.type';

interface Options extends PanelOptions
{
    project?: paper.Project
    parent?: HTMLElement
    callback?: ( panel: PanelComponent ) => {}
}

export const paperjsLayersPanel = {
    create ( options?: Options )
    {
        // merge provided options with default
        let defaultOptions: Options = {
            project : paper.project,
            parent  : document.body,
            callback: null,
        };

        // merge item options separately to controll deep merging
        const itemsOptions = Object.assign({}, DEFAULT_PANEL_OPTIONS.items, options && options.items);

        // merge options with default
        options       = Object.assign({}, DEFAULT_PANEL_OPTIONS, defaultOptions, options);
        options.items = itemsOptions;

        // check project
        if (!options.project)
        {
            if (!paper || !paper.project)
            {
                throw 'Cannot instantiate Paperjs Layers Panel because no project was provided and global "paper.project" is not available.';
            }
            options.project = paper.project;
        }

        // create element
        const element = options.parent.appendChild(document.createElement('paperjs-layer-panel'));

        // call it when element is ready
        element.addEventListener('ready', ( event: any ) =>
        {
            // retrieve instance
            const instance: PanelComponent = event.detail;

            // bind options
            let panelOptions: PanelOptions = Object.assign({}, options);
            delete panelOptions[ 'parent' ];
            delete panelOptions[ 'callback' ];
            delete panelOptions[ 'project' ];
            instance.options = panelOptions;
            // bind project
            instance.project = options.project;

            // call callback if it was provided
            if (options.callback)
            {
                options.callback(instance);
            }
        });
    },
};
