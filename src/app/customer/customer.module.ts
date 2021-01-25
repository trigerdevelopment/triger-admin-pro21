import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';
import { InvoiceListComponent } from './customer-invoice/invoice-list/invoice-list.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './customer.component';


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerInvoiceComponent,
    InvoiceListComponent],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule
  ],
  exports: [
    InvoiceListComponent
  ]
})
export class CustomerModule { }
