import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFormComponent } from './add-customer/customer-form/customer-form.component';
import { CustomerInvoiceFormComponent } from './customer-invoice-form/customer-invoice-form.component';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';
import { InvoiceDetailsComponent } from './customer-invoice/invoice-list/invoice-details/invoice-details.component';
import { CustomerDetailsComponent } from './customer-list/customer-details/customer-details.component';
import { CustomerListComponent } from './customer-list/customer-list.component';


const routes: Routes = [
  {
   path: 'invoice',
    component:CustomerInvoiceComponent
  },
  {
   path: 'add-invoice',
    component:CustomerInvoiceFormComponent
  },
  {
   path: 'list',
    component:CustomerListComponent
  },
  {
   path: 'add-customer',
    component:CustomerFormComponent
  },
  {
   path: 'invoice-details/:id',
    component:InvoiceDetailsComponent
  },
  {
   path: 'customer-edit/:id',
    component:CustomerFormComponent
  },
  {
   path: 'customer-details/:id',
    component:CustomerDetailsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
