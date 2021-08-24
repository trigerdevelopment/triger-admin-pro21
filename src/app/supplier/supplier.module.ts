import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { SupplierInvoiceListComponent } from './supplier-invoice-list/supplier-invoice-list.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierInvoiceFormComponent } from './supplier-invoice-form/supplier-invoice-form.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierInvoiceDetailsComponent } from './supplier-invoice-details/supplier-invoice-details.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import * as supplierInvoiceReducer from './store/reducers/supplier-invoice.reducer';
import * as supplierReducer from './store/reducers/supplier.reducers';

import { FilterComponent } from './filter/filter.component';
import { NgxModalService } from '../services/shared/ngx-modal.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EffectsModule } from '@ngrx/effects';
import { SupplierInvoiceEffects } from './store/effects/supplier-invoice.effects';
import { ModalUploadXmlSupplierComponent } from '../modals/modal-upload-xml-supplier/modal-upload-xml-supplier.component';
import { SupplierListPaginatorComponent } from './supplier-list-paginator/supplier-list-paginator.component';
import { SupplierFilterComponent } from './supplier-filter/supplier-filter.component';
import { SUPPLIER_REDUCER } from './store/reducers/supplier.reducers';
import { SupplierEffects } from './store/effects/supplier.effects';


@NgModule({
  declarations: [
    SupplierComponent,
    SupplierInvoiceListComponent,
    SupplierListComponent,
    SupplierInvoiceFormComponent,
    SupplierFormComponent,
    SupplierInvoiceDetailsComponent,
    SupplierDetailsComponent,
    ModalUploadXmlSupplierComponent,
    FilterComponent,
    SupplierListPaginatorComponent,
    SupplierFilterComponent,
  ],
  imports: [
    CommonModule,
    // Ng2TableModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forChild(),

    Ng2SmartTableModule,
    SupplierRoutingModule,
    SharedModule,
    StoreModule.forFeature(supplierInvoiceReducer.supplierInvoiceFeatureKey, supplierInvoiceReducer.SUPPLIER_INVOICE_REDUCER),
    StoreModule.forFeature(supplierReducer.supplierFeatureKey, supplierReducer.SUPPLIER_REDUCER),
    EffectsModule.forFeature([SupplierInvoiceEffects,SupplierEffects]),


  ],
  providers: [
    NgxModalService,

  ],
  exports: [
    SupplierComponent,
    SupplierInvoiceListComponent,
    SupplierListComponent
  ]
})
export class SupplierModule { }
