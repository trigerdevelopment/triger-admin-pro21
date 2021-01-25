import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { SalesByMonthComponent } from './sales-by-month/sales-by-month.component';
import { REPORTS_ROUTES } from './reports.routes';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ReportsComponent, SalesByMonthComponent],
  imports: [
    CommonModule,
    ChartsModule,
    // SharedModule,
    REPORTS_ROUTES
  ],
  exports: [
  ]
})
export class ReportsModule { }
