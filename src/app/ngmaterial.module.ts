import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
imports: [MatSelectModule],
exports: [MatSelectModule]
})
export class MaterialAppModule { }