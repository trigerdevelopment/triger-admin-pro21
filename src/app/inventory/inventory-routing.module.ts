import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { RawMaterialsListComponent } from './raw-materials-list/raw-materials-list.component';



const routes: Routes = [
  {
   path: 'inventory-list',
    component:InventoryListComponent
  },
  {
   path: 'raw-materials',
    component:RawMaterialsListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
