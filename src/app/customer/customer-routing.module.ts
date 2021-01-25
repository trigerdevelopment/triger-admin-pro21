import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceListComponent } from '../clientes/invoice-list/invoice-list.component';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';


const routes: Routes = [
  {
   path: 'invoice',
    component:CustomerInvoiceComponent
  },
  {
    path: 'invoice-list',
     component:InvoiceListComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
