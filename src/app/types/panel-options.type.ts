import { ItemsOptions } from './items-options.type';

export interface PanelOptions
{
    title?: string
    updatable?: boolean
    closable?: boolean
    draggable?: boolean
    resizable?: boolean
    items?: ItemsOptions
}
