import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { EquipmentArrivalComponent } from './equipment-arrival/equipment-arrival.component';
import { EquipmentBalanceComponent } from './equipment-balance/equipment-balance.component';
import { EquipmentGoneComponent } from './equipment-gone/equipment-gone.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'home',
    component:  LoginComponent
  },
  {
    path: 'logout',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'equipment-arrival',
    component:  EquipmentArrivalComponent
  },
  {
    path: 'equipment-gone',
    component:  EquipmentGoneComponent
  },
  {
    path: 'equipment-balance',
    component: EquipmentBalanceComponent
  },
  {
    path: 'activity-log',
    component: ActivityLogComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
