import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Category } from '../domain/category';
import { MovingEquipment } from '../domain/movingEquipment';
import { NewUserModalComponent } from '../new-user-modal/new-user-modal.component';
import { CategoryService } from '../services/category.service';
import { EquipmentMovingService } from '../services/equipmentMoving.service';

@Component({
  selector: 'app-equipment-activity-log-modal',
  templateUrl: './equipment-activity-log-modal.component.html',
  styleUrls: ['./equipment-activity-log-modal.component.css']
})
export class EquipmentActivityLogModalComponent implements OnInit {

  public categories: Category[] = [];
  public allEquipmentMoving: MovingEquipment[] = [];
  
  constructor(private equipmentMoving: EquipmentMovingService, private categoryService: CategoryService,
    public dialogRef: MatDialogRef<NewUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {equipmentId: number}) {this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = data.movingFrom + data.movingTo + data.movingDate + data.equipment.equipmentName
      + data.equipment.equipmentOrderNumber + data.equipment.equipmentSerialNumber + data.equipment.category.categoryName;
      return dataStr.indexOf(filter) != -1; }}

       displayedColumns: string[] = ['moving-date','moving-user', 'moving-name','moving-category','moving-order','moving-serial','moving-purpose','moving-from','moving-to', 'moving-description'];
  dataSource = new MatTableDataSource();




  ngOnInit(): void {
    this.equipmentMoving.getAllOrderByDate().subscribe(response => {
      this.allEquipmentMoving = response;
      this.dataSource.data = this.allEquipmentMoving;
      console.log(this.allEquipmentMoving);
      this.categoryService.getAllCategories().subscribe(
        response => {this.categories = response;
          console.log(this.categories[0].categoryName);}
        
      );
    });
  }
  onClose(): void{
    this.dialogRef.close();
  }

 

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }
  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }
}
function ViewChild(MatPaginator: any) {
  throw new Error('Function not implemented.');
}

function MatPaginator(MatPaginator: any) {
  throw new Error('Function not implemented.');
}

