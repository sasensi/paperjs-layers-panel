/**
 * This add an helper method to global paper object allowing easy instantiation of layers panel.
 */

if (!paper)
{
    throw 'Global variable "paper" is missing.';
}

// add utility method inside global paper
(paper as any).createLayersPanel = ( options: any = {} ) =>
{
    // merge provided options with default
    let defaultOptions = {
        scope   : paper,
        parent  : document.body,
        callback: null,
    };

    // handle callback as single argument case
    if (typeof options === 'function')
    {
        options = { callback: options };
    }

    // merge options with default
    options = Object.assign({}, defaultOptions, options);

    // create element
    var element = options.parent.appendChild(document.createElement('paperjs-layer-panel'));

    // bind scope
    element.scope = options.scope;

    // if callback was provided
    if (options.callback)
    {
        // call it when element is ready
        element.addEventListener('ready', event => options.callback(event.detail));
    }
};
