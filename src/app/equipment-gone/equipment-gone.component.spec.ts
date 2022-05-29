import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentGoneComponent } from './equipment-gone.component';

describe('EquipmentGoneComponent', () => {
  let component: EquipmentGoneComponent;
  let fixture: ComponentFixture<EquipmentGoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentGoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentGoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
