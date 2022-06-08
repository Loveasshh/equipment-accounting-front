
import { DataSource } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { delay, map, startWith, tap } from 'rxjs';
import { Category } from '../domain/category';
import { MovingEquipment } from '../domain/movingEquipment';
import { User } from '../domain/user';
import { AdminService } from '../services/admin.service';
import { CategoryService } from '../services/category.service';
import {ViewChild} from '@angular/core';
import {AfterContentInit} from '@angular/core';
import { EquipmentMovingService } from '../services/equipmentMoving.service';
import { EquipmentResponse } from '../domain/equipmentResponse';
import { EquipmentMovingResponse } from '../domain/equipmentMovingResponse';
import { Equipment } from '../domain/equipment';
import { EquipmentService } from '../services/equipment.service';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BooleanInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-equipment-gone',
  templateUrl: './equipment-gone.component.html',
  styleUrls: ['./equipment-gone.component.css']
})

export class EquipmentGoneComponent implements OnInit, AfterContentInit{
  public check: boolean = false;
  private month: number | any;
  private date: string|any;
  
  public choosenEquipmentMoving: MovingEquipment = new MovingEquipment();
  public equipmentMovingRs: EquipmentMovingResponse = new EquipmentMovingResponse();
  public categories: Category [] = [];
  public equipmentMoving: MovingEquipment = new MovingEquipment();
  
  clickedRows = new Set<MovingEquipment>();
  public isGone: boolean[] = [];
  public allEquipmentMoving: MovingEquipment[] = [];
  displayedColumns: string[] = ['moving-name','moving-category','moving-order','moving-serial','moving-to'];

  dataSource = new MatTableDataSource();

  myForm: FormGroup = new FormGroup({
    "description": new FormControl("", Validators.required),
    "purpose": new FormControl("", Validators.required),
    "movingFrom": new FormControl("", Validators.required),
    "movingTo": new FormControl("", Validators.required),
  })

  constructor(private cdref: ChangeDetectorRef, private equipmentMovingService: EquipmentMovingService, 
    private categoryService: CategoryService, private equipmentService: EquipmentService, private userService: UserService,
    private tokenStorage: TokenStorageService, public snackBar: MatSnackBar) {
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = data.movingFrom + data.movingTo + data.movingDate + data.equipment.equipmentName
      + data.equipment.equipmentOrderNumber + data.equipment.equipmentSerialNumber + data.equipment.category.categoryName;
      return dataStr.indexOf(filter) != -1;
    }}
   
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngOnInit(): void {
    this.equipmentMovingService.getAllEquipmentMovingWithUniqueEquipment().subscribe(response => {
      this.allEquipmentMoving = response;
      this.dataSource.data = this.allEquipmentMoving;
      
      this.categoryService.getAllCategories().subscribe(
        response => {this.categories = response;}
      );
    });
  }
  

  ngAfterContentInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  onChange($event:any){
    this.applyFilter($event.value);
    this.allEquipmentMoving.filter(equiipment => equiipment.equipment.category.categoryName == $event.value);
    this.dataSource.data = this.allEquipmentMoving;
  }

  get _equipmentName() {
    return this.myForm.get('equipmentName')
  }

   getRecord(equipmentMoving: MovingEquipment) {
      this.clickedRows = new Set<MovingEquipment>();
      this.clickedRows.add(equipmentMoving);
      this.choosenEquipmentMoving = equipmentMoving;
   }

  onSubmit() {
    console.log(this.check);
    if (this.myForm.valid) {
      this.userService.getUserByName(this.tokenStorage.getUsername()).subscribe((el) => {
          console.log(this.equipmentMoving);
          console.log(this.choosenEquipmentMoving);
          this.equipmentMovingRs.description = this.equipmentMoving.description;
          this.equipmentMovingRs.equipmentId = this.choosenEquipmentMoving.equipment.id;
          this.equipmentMovingRs.userId = el.id;
          this.equipmentMovingRs.movingFrom = this.equipmentMoving.movingFrom;
          this.equipmentMovingRs.movingTo = this.equipmentMoving.movingTo;
          this.equipmentMovingRs.movingType = "Уход";
          if (this.check) {
            this.equipmentMovingRs.isTemporary = "Да";
            this.equipmentMovingRs.returnDate = this.date;
          } else {
            this.equipmentMovingRs.isTemporary = "Нет";
            this.equipmentMovingRs.returnDate = "";
          }
          this.equipmentMovingRs.purpose = this.equipmentMoving.purpose;
          
          this.equipmentMovingService.addEquipmentMoving(this.equipmentMovingRs).subscribe(()=>window.location.reload());
        
      });
      this.snackBar.open("Уход оборудования успешно зафиксирован", "", {
        duration: 3000
      });
      
    }
  }
  get _movingFrom() {
    return this.myForm.get('movingFrom')
  }
  get _movingTo() {
    return this.myForm.get('movingTo')
  }
  get _description() {
    return this.myForm.get('description')
  }
  get _purpose() {
    return this.myForm.get('purpose')
  }

  public onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.month = event.value?.getMonth();
    this.month++;
    this.date = event.value?.getFullYear() + "-" + this.month + "-" + event.value?.getDate();
    console.log(this.date);
  }

  checked(){
    if (this.check) {
      this.check = false;
        
    } else{
      this.check = true;
      
    }
  }
}
