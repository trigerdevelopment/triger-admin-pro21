import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { SalesComponent } from './sales/sales.component';
import { SharedModule } from '../shared/shared.module';
import { FilterReportComponent } from './filter-report/filter-report.component';
import { FormsModule } from '@angular/forms';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseFilterReportComponent } from './purchase-filter-report/purchase-filter-report.component';
import { IncomeStatementsComponent } from './income-statements/income-statements.component';


@NgModule({
  declarations: [ReportsComponent, SalesComponent, FilterReportComponent, PurchaseComponent, PurchaseFilterReportComponent, IncomeStatementsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReportsRoutingModule,
    SharedModule,
  ]
})
export class ReportsModule { }
