import { async, TestBed } from '@angular/core/testing';
import { PanelComponent } from './app.component';

describe('AppComponent', () =>
{
    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                PanelComponent,
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
