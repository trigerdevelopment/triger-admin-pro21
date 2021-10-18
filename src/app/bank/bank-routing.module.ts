import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankComponent } from './bank.component';
import { BankTransactionsComponent } from './bank-transactions/bank-transactions.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';




const routes: Routes = [
  {
   path: 'bank-accounts',
    component:BankAccountsComponent
  },
  {
   path: 'bank-transactions',
    component:BankTransactionsComponent
  },
  {
   path: 'bank-movements-edit',
    component:BankTransactionsComponent
  },



];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }
