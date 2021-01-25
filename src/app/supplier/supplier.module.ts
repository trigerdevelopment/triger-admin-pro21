import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SUPPLIER_ROUTES } from './supplier.routes';
import { SupplierComponent } from './supplier.component';
import { SupplierInvoiceListComponent } from './supplier-invoice-list/supplier-invoice-list.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
// import { Ng2TableModule,NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective  } from 'ng2-table/ng2-table';
// import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SupplierComponent,
    SupplierInvoiceListComponent,
    SupplierListComponent
  ],
  imports: [
    CommonModule,
    // Ng2TableModule,
    FormsModule,
    Ng2SmartTableModule,
    // PaginationModule.forRoot(),
    // NgTablePagingDirective,
    // NgTableComponent, NgTableFilteringDirective,NgTableSortingDirective,
    SUPPLIER_ROUTES
  ],
  exports: [
    SupplierComponent,
    SupplierInvoiceListComponent,
    SupplierListComponent
  ]
})
export class SupplierModule { }
