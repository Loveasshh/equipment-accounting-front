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

  public isGone: boolean[] = [];
  searchText: string = '';
  public categories: Category[] = [];
  public allEquipmentMoving: MovingEquipment[] = [];
  public mappedAraray = [];
  public keys: string[] = [];
  public users: User[] = [];
  public goodResponse = [];
  constructor(private equipmentMoving: EquipmentMovingService, private categoryService: CategoryService,
    private dialog: MatDialog, private tokenStorage: TokenStorageService) {
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = data.movingFrom + data.movingTo + data.movingDate + data.equipment.equipmentName
      + data.equipment.equipmentOrderNumber + data.equipment.equipmentSerialNumber + data.equipment.category.categoryName;
      return dataStr.indexOf(filter) != -1;
    }}
  displayedColumns: string[] = ['moving-date','moving-user', 'moving-name','moving-category','moving-order','moving-serial','moving-purpose','moving-from','moving-to', 'moving-description'];
  dataSource = new MatTableDataSource();
  /*filterValues = {
    movingTo: '',
    movingFrom: ''
  }
  filter = new FormControl('');
  movingFromFilter = new FormControl('');*/
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
  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  onChange($event:any){
    this.applyFilter($event.value);
    this.allEquipmentMoving.filter(equiipment => equiipment.equipment.category.categoryName == $event.value);
    this.dataSource.data = this.allEquipmentMoving;
  }

  addUser() {
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      width: '700px',
      data: {password: this.password, username: this.username}
    })
    dialogRef.afterClosed().subscribe(result => console.log(result))
  }

  deleteUser() {

  }
}
