import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularDraggableModule } from 'angular2-draggable';
import * as paper from 'paper';
import { ItemComponent } from '../item/item.component';
import { PanelComponent } from './panel.component';

describe('AppComponent', () =>
{
    let project: paper.Project;
    let fixture: ComponentFixture<PanelComponent>;
    let debugElement: DebugElement;
    let instance: PanelComponent;
    let element: HTMLElement;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                PanelComponent,
                ItemComponent,
            ],
            imports     : [
                FontAwesomeModule,
                AngularDraggableModule,
            ],
        }).compileComponents();

        if (project)
        {
            project.remove();
        }
        project          = new (paper.Project as any)();
        fixture          = TestBed.createComponent(PanelComponent);
        debugElement     = fixture.debugElement;
        instance         = debugElement.componentInstance;
        element          = debugElement.nativeElement;
        instance.project = project;
    }));

    it('should create', () =>
    {
        expect(instance).toBeTruthy();
    });

    it('should render any items if project is empty', () =>
    {
        var items = debugElement.queryAll(By.css('paperjs-layer-panel-item'));
        expect(items.length).toEqual(0);
    });

    it('should render layers', () =>
    {
        new paper.Layer();
        new paper.Layer();
        instance.update();

        expect(getVisibleItemsCount()).toEqual(2);
    });

    it('should render title', () =>
    {
        expect(debugElement.query(By.css('h1')).nativeElement.textContent).toEqual('Layers panel');
    });

    it('should render update button', () =>
    {
        expect(debugElement.query(By.css('.update-button'))).toBeTruthy();
    });

    it('should render close button', () =>
    {
        expect(debugElement.query(By.css('.close-button'))).toBeTruthy();
    });

    it('should update when update button is clicked', () =>
    {
        new paper.Layer();

        expect(getVisibleItemsCount()).toEqual(0);

        debugElement.query(By.css('.update-button')).triggerEventHandler('click', null);

        expect(getVisibleItemsCount()).toEqual(1);
    });

    it('should be removed when close button is clicked', () =>
    {
        expect(element.parentElement).toBeTruthy();

        debugElement.query(By.css('.close-button')).triggerEventHandler('click', null);

        expect(element.parentElement).not.toBeTruthy();
    });


    //
    // helpers
    //

    function getVisibleItemsCount ()
    {
        return debugElement.queryAll(By.css('paperjs-layer-panel-item')).length;
    }
});
