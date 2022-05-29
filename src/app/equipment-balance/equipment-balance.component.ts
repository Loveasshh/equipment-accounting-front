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

@Component({
  selector: 'app-equipment-balance',
  templateUrl: './equipment-balance.component.html',
  styleUrls: ['./equipment-balance.component.css']
})
export class EquipmentBalanceComponent implements OnInit {
  public clickedRows = new Set<Equipment>();
  choosenEquipment: Equipment = new Equipment();
  public categories: Category[] = [];
  public allEquipment: Equipment[] = [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['equipment-name', 'equipment-order','equipment-serial','equipment-category'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private adminService: AdminService, private categoryService: CategoryService, private equipmentService: EquipmentService,
    private dialog: MatDialog) {

    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = data.equipmentName + data.category.categoryName + data.equipmentSerialNumber + data.equipmentOrderNumber;
      return dataStr.indexOf(filter) != -1;
    }}
   

  ngOnInit(): void {
    this.equipmentService.getAllEquipment().subscribe(response => {
      this.allEquipment = response;
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
      data: {equipmentId: equipment.id}
    })
    dialogRef.afterClosed().subscribe(result => console.log(result))
 }
}
