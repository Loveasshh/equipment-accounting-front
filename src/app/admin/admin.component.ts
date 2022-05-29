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
  public isGone: boolean[] = [];
  searchText: string = '';
  public categories: Category[] = [];
  public allEquipmentMoving: MovingEquipment[] = [];
  public mappedAraray = [];
  public keys: string[] = [];
  public users: User[] = [];
  public goodResponse = [];
  constructor(private adminService: AdminService, private categoryService: CategoryService) {
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = data.movingFrom + data.movingTo + data.movingDate + data.equipment.equipmentName
      + data.equipment.equipmentOrderNumber + data.equipment.equipmentSerialNumber + data.equipment.category.categoryName;
      return dataStr.indexOf(filter) != -1;
    }}
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
}
