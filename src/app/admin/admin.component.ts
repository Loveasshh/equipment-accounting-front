import { DataSource } from '@angular/cdk/collections';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { Category } from '../domain/category';
import { MovingEquipment } from '../domain/movingEquipment';
import { User } from '../domain/user';
import { AdminService } from '../services/admin.service';
import { CategoryService } from '../services/category.service';
import {ViewChild} from '@angular/core';
import {AfterViewInit} from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { EquipmentMovingExcel } from '../domain/equipmentMovingExcel';
import { Equipment } from '../domain/equipment';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit, AfterViewInit{
  isFileSelected: boolean = false;

  equipmentsForExcel: Equipment[] = [];
  movingEquipmentForExcel: MovingEquipment[] = [];
  excel: EquipmentMovingExcel[] = [];
  public isGone: boolean[] = [];
  searchText: string = '';
  public categories: Category[] = [];
  public allEquipmentMoving: MovingEquipment[] = [];
  public mappedAraray = [];
  public keys: string[] = [];
  public users: User[] = [];
  public goodResponse = [];
  constructor(private adminService: AdminService, private categoryService: CategoryService, private excelService:ExcelService) {
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = data.movingFrom + data.movingTo + data.movingDate + data.equipment.equipmentName
      + data.equipment.equipmentOrderNumber + data.equipment.equipmentSerialNumber + data.equipment.category.categoryName;
      return dataStr.indexOf(filter) != -1;
    }
  }
  displayedColumns: string[] = ['moving-date', 'moving-name','moving-category','moving-order','moving-serial','moving-from','moving-to'];
  dataSource = new MatTableDataSource();
  /*filterValues = {
    movingTo: '',
    movingFrom: ''
  }
  filter = new FormControl('');
  movingFromFilter = new FormControl('');*/
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngOnInit(): void {
    this.adminService.getAllEquipmentMoving().subscribe(response => {
      
      this.allEquipmentMoving = response;
      
      this.dataSource.data = this.allEquipmentMoving;
      this.excel = this.allEquipmentMoving.map((equipmentMoving: MovingEquipment) => {
        console.log(equipmentMoving.equipment.serialNumber);
        return {id: equipmentMoving.id, Дата: equipmentMoving.movingDate,
                Тип_Перемещения: equipmentMoving.movingType,Наименование: equipmentMoving.equipment.equipmentName, 
                Заказной_номер: equipmentMoving.equipment.equipmentOrderNumber,
                Серийный_номер: equipmentMoving.equipment.equipmentSerialNumber, 
                От_Кого: equipmentMoving.movingFrom, Кому: equipmentMoving.movingTo, Описание: equipmentMoving.description,
                Назначение: equipmentMoving.purpose};
      });
      console.log(this.allEquipmentMoving);
      this.categoryService.getAllCategories().subscribe(
        response => {this.categories = response;
          console.log(this.categories[0].categoryName);}
        
      );
    });
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }
  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  onChange($event:any){
    this.applyFilter($event.value);
    this.allEquipmentMoving.filter(equiipment => equiipment.equipment.category.categoryName == $event.value);
    this.dataSource.data = this.allEquipmentMoving;
  }

  exportAsXLSX():void {  
    this.excelService.exportAsExcelFile(this.excel, 'sample');  
 }  
 

 onFileChange(evt: any) {
  /*this.isFileSelected = true;
  const target : DataTransfer =  <DataTransfer>(evt.target);
  
  if (target.files.length !== 1) throw new Error('Cannot use multiple files');

  const reader: FileReader = new FileReader();

  reader.onload = (e: any) => {
    const bstr: string = e.target.result;

    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    const wsname : string = wb.SheetNames[0];

    const ws: XLSX.WorkSheet = wb.Sheets[wsname];



    this.dataExcel = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

    
  };

  reader.readAsBinaryString(target.files[0]);
*/
}
  importAsXLSX():void {
 /*   this.equipmentList = this.equipmentFromExcel.map((object: any) => {
      return {
        equipmentName: object[0], equipmentDescription: object[0], equipmentSerialNumber: object[1],
        equipmentOrderNumber: object[2], categoryName:object[3]
      };
    });
    this.equipmentList.forEach(el => {
        this.equipmentService.addEquipment(el).subscribe();
    });
  }*/
    
  }
  /*console.log("сука " + this.equipmentFromExcel);
  let x = this.dataExcel.slice(1);
  this.equipmentFromExcel = [].concat.apply([], x);
  console.log(this.equipmentFromExcel);*/
  
  
}
