import { PanelComponent } from './components/panel/panel.component';

interface Options
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

        // merge options with default
        options = Object.assign({}, defaultOptions, options);

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
        var element = options.parent.appendChild(document.createElement('paperjs-layer-panel'));

        // call it when element is ready
        element.addEventListener('ready', ( event: any ) =>
        {
            // retrieve instance
            const instance: PanelComponent = event.detail;

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
