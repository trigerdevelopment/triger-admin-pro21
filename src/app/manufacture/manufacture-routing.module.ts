import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionFormComponent } from './production-form/production-form.component';
import { ProductionListComponent } from './production-list/production-list.component';



const routes: Routes = [
  {
   path: 'add-production',
    component:ProductionFormComponent
  },
  {
   path: 'production-list',
    component:ProductionListComponent
  },
  // {
  //  path: 'add-invoice',
  //   component:CustomerInvoiceFormComponent
  // },
  // {

  // {
  //  path: 'add-customer',
  //   component:CustomerFormComponent
  // },
  // {
  //  path: 'invoice-details/:id',
  //   component:InvoiceDetailsComponent
  // },
  // {
  //  path: 'customer-edit/:id',
  //   component:CustomerFormComponent
  // },
  // {
  //  path: 'customer-details/:id',
  //   component:CustomerDetailsComponent
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufactureRoutingModule { }
