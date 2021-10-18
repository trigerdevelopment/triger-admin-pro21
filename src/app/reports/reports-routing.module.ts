import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomeStatementsComponent } from './income-statements/income-statements.component';
import { PurchaseComponent } from './purchase/purchase.component';
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


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
