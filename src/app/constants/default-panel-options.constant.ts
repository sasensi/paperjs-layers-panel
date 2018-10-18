import { PanelOptions } from '../types/panel-options.type';

export const DEFAULT_PANEL_OPTIONS: PanelOptions = {
    title    : 'Layers panel',
    updatable: true,
    closable : true,
    draggable: true,
    resizable: true,
    onClose  : null,
    items    : {
        hidable   : true,
        lockable  : true,
        selectable: true,
        deletable : true,
        expandable: true,
        expanded  : false,
    },
};
