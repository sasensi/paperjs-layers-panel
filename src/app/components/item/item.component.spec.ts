import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ItemComponent } from './item.component';

describe('ItemComponent', () =>
{
    let component: ItemComponent;
    let fixture: ComponentFixture<ItemComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
                   declarations: [ ItemComponent ],
                   imports     : [ FontAwesomeModule ],
               })
               .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture   = TestBed.createComponent(ItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
