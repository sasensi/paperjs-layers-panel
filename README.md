# Paperjs Layers Panel
[![Build Status](https://travis-ci.org/sasensi/paperjs-layers-panel.svg?branch=develop)](https://travis-ci.org/sasensi/paperjs-layers-panel)

This is a [Paper.js](http://paperjs.org/) plugin displaying project hierarchy as an interactive panel.


## Demo
https://sasensi.github.io/paperjs-layers-panel/


## Usage
Include the file located at `./build/paperjs-layers-panel.js` by adding a `<script>` tag to your page.
```html
<script src="./paperjs-layers-panel.js"></script>
```

Then in your app, after `Paper.js` is [bounded](http://paperjs.org/reference/paperscope/#setup-element) to a canvas, you can simply call the helper function to create a panel for the current project.
```javascript
paperjsLayersPanel.create();
```

## Technologies
This plugin is built with [Angular](https://angular.io/) and bundled as a [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) thanks to [@angular/elements](https://angular.io/api/elements) package.  
The reason behind that is simply that I wanted to try it...  
Advantages:
- quick and easy development thanks to `Angular` ecosystem
    - project scaffolding with [Angular CLI](https://cli.angular.io/)
    - usage of existing components ([dragable and resizable elements](https://github.com/xieziyu/angular2-draggable), [FontAwesome icons](https://github.com/FortAwesome/angular-fontawesome))
    - built-in change detection system
    - coded in `TypeScript`
    - ...
- everything needed is directly bundled with the component so there is no need for the user to include additional stylesheet or dependencies (except `Paper.js` of course) 

Drawbacks:
- bundle is quite heavy (279Kb raw, 87Kb gzipped) because of `Angular` actual compiler that keeps a lot of the framework inside the bundle even for this kind of project
- browser compatibility is not optimal

So in its actual state, this plugin is more suited for debugging of `Paper.js` projects or for contexts where weight and compatibility are not important (if that exist).


## API
### Instantiation method
This plugin register a global object `paperjsLayersPanel` containing a single method `create()`.  
It can be called without argument automatically binding panel to current project and appending element to the document body.
```javascript
paperjsLayersPanel.create();
```
It can also be called passing an `object` as argument with following optional properties:
```
{
    project?: paper.Project
    parent?: HTMLElement
    callback?: ( panel: PanelComponent ) => {}
}
```
Default options:
```javascript
paperjsLayersPanel.create({
    project : paper.project,
    parent  : document.body,
    callback: null,
});
```

### Instance methods
First, you need to retrieve `PanelComponent` instance from the callback:
```javascript
paperjsLayersPanel.create({callback: function (panel) {
    // Here you can call instance methods.
    panel.update();    
}});
```
Then, these methods can be used to control the panel:
- `update()` Manually triggers project change detection and update display. 
- `close()` Completely remove the panel from the DOM.
- `resetSize()` Reset panel to its original size (cancel effects of resizing through UI).

## Roadmap
### Use cases 
- [x] bind scope
- [x] see all project items
- [x] see item
    - [x] name or type
    - [x] visibility
    - [x] locked state
    - [x] selected state
- [x] update display
- [x] toggle item selected state
- [x] toggle item locked state
- [x] toggle item visibility
- [x] delete item
- [x] collapse / expand groups
- [x] collapse / expand panel
- [x] move panel
- [x] resize panel
- [x] reset panel size
- [x] open / close panel
### Project
- [x] stylize
- [x] comment code
- [x] simplify API
- [x] online demo
- [x] complete readme
- [ ] add tests
- [ ] add to npm repository
- [ ] add to CDN
- [ ] add to [sketch](http://sketch.paperjs.org)
- [ ] contribute note
