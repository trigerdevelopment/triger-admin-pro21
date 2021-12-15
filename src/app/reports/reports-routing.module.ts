import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomeStatementsComponent } from './income-statements/income-statements.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SalesVolumeComponent } from './sales-volume/sales-volume.component';
import { SalesComponent } from './sales/sales.component';



const routes: Routes = [
  {
   path: 'sales',
    component:SalesComponent
  },
  {
   path: 'purchase',
    component:PurchaseComponent
  },
  {
   path: 'income-statements',
    component:IncomeStatementsComponent
  },
  {
   path: 'sales-volume',
    component:SalesVolumeComponent
  },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
