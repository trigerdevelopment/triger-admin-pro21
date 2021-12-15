import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementWhareHouseDetailsFormComponent } from './movement-whare-house-details-form.component';

describe('MovementWhareHouseDetailsFormComponent', () => {
  let component: MovementWhareHouseDetailsFormComponent;
  let fixture: ComponentFixture<MovementWhareHouseDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementWhareHouseDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementWhareHouseDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
