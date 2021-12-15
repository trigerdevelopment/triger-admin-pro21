import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementWhareHouseDetailsComponent } from './movement-whare-house-details.component';

describe('MovementWhareHouseDetailsComponent', () => {
  let component: MovementWhareHouseDetailsComponent;
  let fixture: ComponentFixture<MovementWhareHouseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementWhareHouseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementWhareHouseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
