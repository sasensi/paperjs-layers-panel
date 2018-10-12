import { async, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularDraggableModule } from 'angular2-draggable';
import { ItemComponent } from '../item/item.component';
import { PanelComponent } from './panel.component';
import * as paper from 'paper';

// expose paper
(window as any).paper = paper;

describe('AppComponent', () =>
{
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
    }));

    it('should create the app', () =>
    {
        const fixture = TestBed.createComponent(PanelComponent);
        const app     = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
