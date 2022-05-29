import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentActivityLogModalComponent } from './equipment-activity-log-modal.component';

describe('EquipmentActivityLogModalComponent', () => {
  let component: EquipmentActivityLogModalComponent;
  let fixture: ComponentFixture<EquipmentActivityLogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentActivityLogModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentActivityLogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
