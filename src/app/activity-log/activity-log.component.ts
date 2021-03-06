import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TokenStorageService } from '../auth/token-storage.service';
import { Category } from '../domain/category';
import { MovingEquipment } from '../domain/movingEquipment';
import { User } from '../domain/user';
import { NewUserModalComponent } from '../new-user-modal/new-user-modal.component';
import { AdminService } from '../services/admin.service';
import { CategoryService } from '../services/category.service';
import { EquipmentMovingService } from '../services/equipmentMoving.service';
import { SureDeleteComponent } from '../sure-delete/sure-delete.component';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit, AfterViewInit{
  roles!: string[];
  authority!: string;
  username!: string;
  password!: string;
  public clickedRows = new Set<MovingEquipment>();
  choosenEquipment: MovingEquipment = new MovingEquipment();
  public categories: Category[] = [];
  public allEquipmentMoving: MovingEquipment[] = [];
  displayedColumns: string[] = ['moving-date','moving-user', 'moving-name','moving-category','moving-order','moving-serial','moving-purpose','moving-from','moving-to', 'moving-description',  'moving-temporary','moving-return'];
  dataSource = new MatTableDataSource();
  
  constructor(private equipmentMoving: EquipmentMovingService, private categoryService: CategoryService,
    private dialog: MatDialog, private tokenStorage: TokenStorageService) {
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = data.movingFrom + data.movingTo + data.movingDate + data.equipment.equipmentName
      +data.user.username + data.equipment.equipmentOrderNumber + data.equipment.equipmentSerialNumber + data.equipment.category.categoryName + data.isTemporary + data.returnDate;
      return dataStr.indexOf(filter) != -1;
    }}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
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
  

  ngAfterViewInit() {
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
  getRecord(equipmentMoving: MovingEquipment) {
    this.clickedRows = new Set<MovingEquipment>();
    this.clickedRows.add(equipmentMoving);
    this.choosenEquipment = equipmentMoving;
    
 }
  addUser() {
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      width: '700px',
      data: {password: this.password, username: this.username}
    })
    dialogRef.afterClosed().subscribe(result => console.log(result))
  }

  deleteUser() {
      console.log(this.choosenEquipment.user.id);
      const dialogRef = this.dialog.open(SureDeleteComponent, {
        width: '500px',
        data: {username: this.choosenEquipment.user.username}
      })
      dialogRef.afterClosed().subscribe(result => console.log(result))
  }
}
