import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentArrivalComponent } from './equipment-arrival.component';

describe('EquipmentArrivalComponent', () => {
  let component: EquipmentArrivalComponent;
  let fixture: ComponentFixture<EquipmentArrivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentArrivalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
