import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignUpInfo } from '../auth/signup-info';
import { TokenStorageService } from '../auth/token-storage.service';
import { Category } from '../domain/category';
import { Equipment } from '../domain/equipment';
import { EquipmentMovingResponse } from '../domain/equipmentMovingResponse';
import { EquipmentResponse } from '../domain/equipmentResponse';
import { MovingEquipment } from '../domain/movingEquipment';
import { CategoryService } from '../services/category.service';
import { EquipmentService } from '../services/equipment.service';
import { EquipmentMovingService } from '../services/equipmentMoving.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-equipment-arrival',
  templateUrl: './equipment-arrival.component.html',
  styleUrls: ['./equipment-arrival.component.css']
})
export class EquipmentArrivalComponent implements OnInit {
  username!: string;
  public equipmentRs: EquipmentResponse = new EquipmentResponse();
  public equipmentMovingRs: EquipmentMovingResponse = new EquipmentMovingResponse();
  public categories: Category [] = [];
  public equipment: Equipment = new Equipment();
  public equipmentMoving: MovingEquipment = new MovingEquipment();
  myForm: FormGroup = new FormGroup({
    "equipmentName": new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ]),
    "equipmentSerialNumber": new FormControl("", Validators.required),
    "equipmentOrderNumber": new FormControl("", Validators.required),
    "description": new FormControl("", Validators.required),
    "purpose": new FormControl("", Validators.required),
    "movingFrom": new FormControl("", Validators.required),
    "movingTo": new FormControl("", Validators.required),
    "category": new FormControl(Category, Validators.required)
  })

  constructor(private categoryService: CategoryService,private tokenStorage: TokenStorageService, private equipmentService: EquipmentService,
    private userService: UserService, private equipmentMovingService: EquipmentMovingService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      response => {this.categories = response;
        console.log(this.categories[0].categoryName);}
    );
  }
  onSave() {
    if (this.myForm.valid) {
      
      this.equipmentRs.equipmentDescription = this.equipment.equipmentDescription;
      this.equipmentRs.equipmentName = this.equipment.equipmentName;
      this.equipmentRs.equipmentOrderNumber = this.equipment.equipmentOrderNumber;
      this.equipmentRs.equipmentSerialNumber = this.equipment.equipmentSerialNumber;
      this.equipmentRs.categoryName = JSON.stringify(this.equipment.category);
      console.log(this.equipment.equipmentName)
      this.equipmentService.addEquipment(this.equipmentRs).subscribe(() => {
        
      });
      this.userService.getUserByName(this.tokenStorage.getUsername()).subscribe((el) => {
        this.equipmentMoving.user = el
        console.log(el)
        this.equipmentService.getEquipmentByName(this.equipment.equipmentName).subscribe((el2) => {
          this.equipmentMoving.equipment = el2
          console.log(el2)
          this.equipmentMovingRs.description = this.equipmentMoving.description;
          this.equipmentMovingRs.equipmentId = this.equipmentMoving.equipment.id;
          this.equipmentMovingRs.userId = this.equipmentMoving.user.id;
          this.equipmentMovingRs.movingFrom = this.equipmentMoving.movingFrom;
          this.equipmentMovingRs.movingTo = this.equipmentMoving.movingTo;
          this.equipmentMovingRs.movingType = "Приход";
          this.equipmentMovingRs.purpose = this.equipmentMoving.purpose;
          
          console.log("сука " + this.equipmentMovingRs.equipmentId)
          this.equipmentMovingService.addEquipmentMoving(this.equipmentMovingRs).subscribe(()=>window.location.reload());
        })
      });
      
      
    }
  }
  get _equipmentName() {
    return this.myForm.get('equipmentName')
  }
}
