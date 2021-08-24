import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierInvoiceFormComponent } from './supplier-invoice-form/supplier-invoice-form.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierInvoiceDetailsComponent } from './supplier-invoice-details/supplier-invoice-details.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { SupplierInvoiceListComponent } from './supplier-invoice-list/supplier-invoice-list.component';
import { SupplierInvoiceComponent } from './supplier-invoice/supplier-invoice.component';


const routes_supplier: Routes = [
  {
   path: 'invoice',
    component:SupplierInvoiceComponent
  },
  {
   path: 'add-invoice',
    component:SupplierInvoiceFormComponent
  },
  {
   path: 'supplier-list',
    component:SupplierListComponent
  },
  {
   path: 'invoice-list',
    component:SupplierInvoiceListComponent
  },
  {
   path: 'add-supplier',
    component:SupplierFormComponent
  },
  {
   path: 'invoice-details/:id',
    component:SupplierInvoiceDetailsComponent
  },
  {
   path: 'supplier-edit/:id',
    component:SupplierFormComponent
  },
  {
   path: 'supplier-details/:id',
    component:SupplierDetailsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes_supplier)],
  exports: [RouterModule],
  declarations: [],

})
export class SupplierRoutingModule { }
