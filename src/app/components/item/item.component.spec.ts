import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as paper from 'paper';
import { ItemComponent } from './item.component';

describe('ItemComponent', () =>
{
    let project: paper.Project;
    let fixture: ComponentFixture<ItemComponent>;
    let debugElement: DebugElement;
    let instance: ItemComponent;
    let element: HTMLElement;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [ ItemComponent ],
            imports     : [ FontAwesomeModule ],
        }).compileComponents();

        if (project)
        {
            project.remove();
        }
        project      = new (paper.Project as any)();
        fixture      = TestBed.createComponent(ItemComponent);
        debugElement = fixture.debugElement;
        instance     = debugElement.componentInstance;
        element      = debugElement.nativeElement;
    }));

    it('should create', () =>
    {
        expect(instance).toBeTruthy();
    });

    it('should render nothing when item is not bound', () =>
    {
        expect(debugElement.query(By.css('.item'))).toBeNull();
    });

    it('should render item when item is bound', () =>
    {
        bindItem();
        expect(debugElement.query(By.css('.item'))).toBeTruthy();
    });

    it('should render item name', () =>
    {
        const name = 'test';
        const item = new paper.Path({ name });
        bindItem(item);

        expect(debugElement.query(By.css('h2')).nativeElement.textContent).toEqual(name);
    });

    it('should render visibility button', () =>
    {
        bindItem();
        expect(debugElement.query(By.css('.visibility-button'))).toBeTruthy();
    });

    it('should render locked button', () =>
    {
        bindItem();
        expect(debugElement.query(By.css('.locked-button'))).toBeTruthy();
    });

    it('should render selected button', () =>
    {
        bindItem();
        expect(debugElement.query(By.css('.selected-button'))).toBeTruthy();
    });

    it('should render delete button', () =>
    {
        bindItem();
        expect(debugElement.query(By.css('.delete-button'))).toBeTruthy();
    });

    it('should not render children by default', () =>
    {
        var group = new paper.Group(new paper.Path());
        bindItem(group);
        expect(getVisibleItemsCount()).toEqual(0);
    });

    it('should render children when children button is clicked', () =>
    {
        var group = new paper.Group(new paper.Path());
        bindItem(group);
        expect(getVisibleItemsCount()).toEqual(0);
        debugElement.query(By.css('.children-button')).triggerEventHandler('click', null);
        expect(getVisibleItemsCount()).toEqual(1);
    });

    it('should remove children when children button is clicked again', () =>
    {
        var group = new paper.Group(new paper.Path());
        bindItem(group);
        expect(getVisibleItemsCount()).toEqual(0);
        debugElement.query(By.css('.children-button')).triggerEventHandler('click', null);
        expect(getVisibleItemsCount()).toEqual(1);
        debugElement.query(By.css('.children-button')).triggerEventHandler('click', null);
        expect(getVisibleItemsCount()).toEqual(0);
    });

    it('should toggle visibility when visibility button is clicked', () =>
    {
        var item = bindItem();
        expect(item.visible).toBeTruthy();
        debugElement.query(By.css('.visibility-button')).triggerEventHandler('click', null);
        expect(item.visible).toBeFalsy();
        debugElement.query(By.css('.visibility-button')).triggerEventHandler('click', null);
        expect(item.visible).toBeTruthy();
    });

    it('should toggle locked state when locked button is clicked', () =>
    {
        var item = bindItem();
        expect(item.locked).toBeFalsy();
        debugElement.query(By.css('.locked-button')).triggerEventHandler('click', null);
        expect(item.locked).toBeTruthy();
        debugElement.query(By.css('.locked-button')).triggerEventHandler('click', null);
        expect(item.locked).toBeFalsy();
    });

    it('should toggle selected state when selected button is clicked', () =>
    {
        var item = bindItem();
        expect(item.selected).toBeFalsy();
        debugElement.query(By.css('.selected-button')).triggerEventHandler('click', null);
        expect(item.selected).toBeTruthy();
        debugElement.query(By.css('.selected-button')).triggerEventHandler('click', null);
        expect(item.selected).toBeFalsy();
    });

    it('should delete item when delete button is clicked', () =>
    {
        var item = bindItem();
        expect(project.activeLayer.children.length).toEqual(1);
        debugElement.query(By.css('.delete-button')).triggerEventHandler('click', null);
        expect(project.activeLayer.children.length).toEqual(0);
    });


    //
    // helpers
    //

    function bindItem ( item?: paper.Item )
    {
        item          = item || new paper.Path();
        instance.item = item;
        instance.update();
        return item;
    }

    function getVisibleItemsCount ()
    {
        return debugElement.queryAll(By.css('paperjs-layer-panel-item')).length;
    }
});
