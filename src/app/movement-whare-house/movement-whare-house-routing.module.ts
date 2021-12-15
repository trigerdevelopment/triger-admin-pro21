import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovementWhareHouseListComponent } from './movement-whare-house-list/movement-whare-house-list.component';
import { WhareHouseFormComponent } from './whare-house-form/whare-house-form.component';




const routes: Routes = [
  {
   path: 'invoice',
    // component:CustomerInvoiceComponent

  },
  {
   path: 'add',
    component:WhareHouseFormComponent
  },
  {
   path: 'list',
    component:MovementWhareHouseListComponent
  },
  {
   path: 'add-customer',
    // component:CustomerFormComponent
  },
  {
   path: 'invoice-details/:id',
    // component:InvoiceDetailsComponent
  },
  {
   path: 'customer-edit/:id',
    // component:CustomerFormComponent
  },
  {
   path: 'customer-details/:id',
    // component:CustomerDetailsComponent
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementWhareHouseRoutingModule { }
