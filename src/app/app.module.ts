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
import { AdminComponent } from './admin/admin.component';

import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from '@angular/material/table'  
import {MatPaginatorModule } from '@angular/material/paginator';
import { MaterialAppModule } from './ngmaterial.module';
import { CommonModule, NgStyle } from '@angular/common';
import { NewUserModalComponent } from './new-user-modal/new-user-modal.component';
import { EquipmentActivityLogModalComponent } from './equipment-activity-log-modal/equipment-activity-log-modal.component';


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
    EquipmentActivityLogModalComponent
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
    MatDialogModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
