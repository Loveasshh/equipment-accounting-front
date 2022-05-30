import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../domain/category';
import { Equipment } from '../domain/equipment';
import { MovingEquipment } from '../domain/movingEquipment';
import { EquipmentActivityLogModalComponent } from '../equipment-activity-log-modal/equipment-activity-log-modal.component';
import { NewUserModalComponent } from '../new-user-modal/new-user-modal.component';
import { AdminService } from '../services/admin.service';
import { CategoryService } from '../services/category.service';
import { EquipmentService } from '../services/equipment.service';
import * as XLSX from 'xlsx';
import { EquipmentForExcel } from '../domain/equipmentForExcel';
import { ExcelService } from '../services/excel.service';
import { EquipmentResponse } from '../domain/equipmentResponse';
import { EquipmentList } from '../domain/equipmentList';
@Component({
  selector: 'app-equipment-balance',
  templateUrl: './equipment-balance.component.html',
  styleUrls: ['./equipment-balance.component.css']
})
export class EquipmentBalanceComponent implements OnInit {
  isFileSelected: boolean = false;

  equipmentFromExcel: any[] = [];
  equipmentList: EquipmentResponse[] = [];
  excel: EquipmentForExcel[] = [];
  dataExcel!: [][];
  public clickedRows = new Set<Equipment>();
  choosenEquipment: Equipment = new Equipment();
  public categories: Category[] = [];
  public allEquipment: Equipment[] = [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['equipment-name', 'equipment-order','equipment-serial','equipment-category'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private adminService: AdminService, private categoryService: CategoryService, private equipmentService: EquipmentService,
    private dialog: MatDialog, private excelService:ExcelService) {

    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = data.equipmentName + data.category.categoryName + data.equipmentSerialNumber + data.equipmentOrderNumber;
      return dataStr.indexOf(filter) != -1;
    }}
   

  ngOnInit(): void {
    this.equipmentService.getAllEquipment().subscribe(response => {
      this.allEquipment = response;
      this.excel = this.allEquipment.map((equipment: Equipment) => {
        return {
          id: equipment.id, Наименование: equipment.equipmentName, Серийный_номер: equipment.equipmentSerialNumber,
          Заказной_номер: equipment.equipmentOrderNumber, Категория: equipment.category.categoryName
        };
      });
      this.dataSource.data = this.allEquipment;
      console.log(this.allEquipment);
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
    this.allEquipment.filter(equipment => equipment.category.categoryName == $event.value);
    this.dataSource.data = this.allEquipment;
  }

  getRecord(equipment: Equipment) {
    this.clickedRows = new Set<Equipment>();
    this.clickedRows.add(equipment);
    this.choosenEquipment = equipment;
    const dialogRef = this.dialog.open(EquipmentActivityLogModalComponent, {
      width: '1500px',
      data: {equipmentName: equipment.equipmentName, equipmentSerialNumber: equipment.equipmentSerialNumber}
    })
    dialogRef.afterClosed().subscribe(result => console.log(result))
 }

 exportAsXLSX():void {  
  this.excelService.exportAsExcelFile(this.excel, 'sample');  
}  

 onFileChange(evt: any) {
  this.isFileSelected = true;
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

}
  importAsXLSX():void {
    for (const row of this.dataExcel.slice(1)) {
      this.equipmentFromExcel.push(row);
      
    
  }
  /*console.log("сука " + this.equipmentFromExcel);
  let x = this.dataExcel.slice(1);
  this.equipmentFromExcel = [].concat.apply([], x);
  console.log(this.equipmentFromExcel);*/
  
  this.equipmentList = this.equipmentFromExcel.map((object: any) => {
      return {
        equipmentName: object[0], equipmentDescription: object[0], equipmentSerialNumber: object[1],
        equipmentOrderNumber: object[2], categoryName:object[3]
      };
    });
    this.equipmentList.forEach(el => {
        this.equipmentService.addEquipment(el).subscribe();
    });
  }
}
