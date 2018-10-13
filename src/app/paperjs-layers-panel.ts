import { PanelComponent } from './components/panel/panel.component';

interface Options
{
    parent?: HTMLElement
    callback?: ( panel: PanelComponent ) => {}
}

export const paperjsLayersPanel = {
    create ( project?: paper.Project, options?: Options )
    {
        if (!project)
        {
            if (!paper || !paper.project)
            {
                throw 'Cannot instantiate Paperjs Layers Panel because no project was provided and global "paper.project" is not available.';
            }
            project = paper.project;
        }

        // merge provided options with default
        let defaultOptions = {
            parent  : document.body,
            callback: null,
        };

        // merge options with default
        options = Object.assign({}, defaultOptions, options);

        // create element
        var element = options.parent.appendChild(document.createElement('paperjs-layer-panel'));

        // call it when element is ready
        element.addEventListener('ready', ( event: any ) =>
        {
            // retrieve instance
            const instance: PanelComponent = event.detail;
            // bind project
            instance.project               = project;
            // call callback if it was provided
            if (options.callback)
            {
                options.callback(instance);
            }
        });
    },
};
