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
import { Filter2Component } from './filter2/filter2.component';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';

import * as gastosReducer from './store/reducers/gastos.reducers';
import * as salesReducer from './store/reducers/sales.reducers';
import * as costsReducer from './store/reducers/costs.reducers';
import * as salesVolumeReducer from './store/reducers/volume.reducers';
import { GastosEffects } from './store/effects/gastos.effects';
import { SalesEffects } from './store/effects/sales.effects';
import { CostsEffects } from './store/effects/costs.effects';
import { SalesTableComponent } from './income-statements/sales-table/sales-table.component';
import { SalesVolumeComponent } from './sales-volume/sales-volume.component';
import { FilterSalesVolumeComponent } from './filter-sales-volume/filter-sales-volume.component';
import { SalesVolumeEffects } from './store/effects/volume.effects';
@NgModule({
  declarations: [ReportsComponent, SalesComponent, FilterReportComponent, PurchaseComponent, PurchaseFilterReportComponent, IncomeStatementsComponent, Filter2Component, SalesTableComponent, SalesVolumeComponent, FilterSalesVolumeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReportsRoutingModule,
    SharedModule,
    StoreModule.forFeature(gastosReducer.gastosFeatureKey, gastosReducer.gastosReducer),
    StoreModule.forFeature(salesReducer.salesFeatureKey, salesReducer.salesReducer),
    StoreModule.forFeature(costsReducer.costsFeatureKey, costsReducer.costsReducer),
    StoreModule.forFeature(salesVolumeReducer.salesVolumeFeatureKey, salesVolumeReducer.salesVolumeReducer),
    EffectsModule.forFeature([GastosEffects,SalesEffects,CostsEffects,SalesVolumeEffects])
  ]
})
export class ReportsModule { }
