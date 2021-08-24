import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryComponent } from './inventory.component';


@NgModule({
  declarations: [InventoryComponent, InventoryListComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule,
  ]
})
export class InventoryModule { }
