import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {httpInterceptorProviders} from "./auth/auth-interceptor";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { EquipmentArrivalComponent } from './equipment-arrival/equipment-arrival.component';
import { EquipmentGoneComponent } from './equipment-gone/equipment-gone.component';
import { EquipmentBalanceComponent } from './equipment-balance/equipment-balance.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { AdminComponent } from './equipment-moving/admin.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from '@angular/material/table'  
import {MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MaterialAppModule } from './ngmaterial.module';
import { CommonModule, NgStyle } from '@angular/common';
import { NewUserModalComponent } from './new-user-modal/new-user-modal.component';
import { EquipmentActivityLogModalComponent } from './equipment-activity-log-modal/equipment-activity-log-modal.component';
import { CustomPaginator } from './services/CustomPaginatorConfiguration';
import { SureDeleteComponent } from './sure-delete/sure-delete.component';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox'


export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};
@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    LoginComponent,
    EquipmentArrivalComponent,
    EquipmentGoneComponent,
    EquipmentBalanceComponent,
    ActivityLogComponent,
    AdminComponent,
    NewUserModalComponent,
    EquipmentActivityLogModalComponent,
    SureDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    MaterialAppModule,
    CommonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    httpInterceptorProviders,
    {provide: MatPaginatorIntl, useValue: CustomPaginator()}],
  bootstrap: [AppComponent]
})
export class AppModule { }
