import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentBalanceComponent } from './equipment-balance.component';

describe('EquipmentBalanceComponent', () => {
  let component: EquipmentBalanceComponent;
  let fixture: ComponentFixture<EquipmentBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
