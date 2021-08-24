import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';
import { InvoiceListComponent } from './customer-invoice/invoice-list/invoice-list.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './customer.component';
import { FilterComponent } from './customer-invoice/filter/filter.component';
import { PaginatorComponent } from './customer-invoice/paginator/paginator.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultipleFileComponent } from '../modals/multiple-file/multiple-file.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxModalService } from '../services/shared/ngx-modal.service';
import { InvoiceFormModalComponent } from '../modals/invoice-form-modal/invoice-form-modal.component';
import { CustomerInvoiceFormComponent } from './customer-invoice-form/customer-invoice-form.component';
import { ChartPieComponent } from './chart-pie/chart-pie.component';
import { ChartsModule } from 'ng2-charts';
import { ChartBarComponent } from './chart-bar/chart-bar.component';
import { InvoiceDetailsComponent } from './customer-invoice/invoice-list/invoice-details/invoice-details.component';
import { CustomerFormComponent } from './add-customer/customer-form/customer-form.component';
import { FormInvoiceService } from '../services/form-services/form-invoice.service';

/*------------------------- Componentes del Redux ----------------------------------------*/
import { InvoiceEffects } from './store/effects/invoice.effects';
import { GraphEffects } from './store/effects/graph.effects';
import { ProductsEffects } from './store/effects/products.effects';
import { CustomerEffects } from './store/effects/customer.effects';
import { EffectsModule } from '@ngrx/effects';
import * as fromInvoice from './store/reducers/invoice.reducer';
import * as fromGraphic from './store/reducers/graph.reducer';
import * as fromCustomer from './store/reducers/customer.reducers';
import * as fromProducts from './store/reducers/products.reducers';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer-list/customer-details/customer-details.component';
import { CustomerFilterComponent } from './customer-list/customer-filter/customer-filter.component';
import { AddCustomerTypeComponent } from './add-customer-type/add-customer-type.component';
import { CustomerListPaginatorComponent } from './customer-list/customer-list-paginator/customer-list-paginator.component';
import { ModalTypeComponent } from '../modals/modal-type/modal-type.component';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerInvoiceComponent,
    InvoiceListComponent,
    MultipleFileComponent,
    ModalTypeComponent,
    InvoiceFormModalComponent,
    FilterComponent,
    PaginatorComponent,
    CustomerInvoiceFormComponent,
    ChartPieComponent,
    ChartBarComponent,
    InvoiceDetailsComponent,
    CustomerFormComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    CustomerFilterComponent,
    AddCustomerTypeComponent,
    CustomerListPaginatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forChild(),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    CustomerRoutingModule,
    BsDatepickerModule.forRoot(),
    FileUploadModule,


    StoreModule.forFeature(fromInvoice.invoiceFeatureKey, fromInvoice.reducer),
    StoreModule.forFeature(fromGraphic.graphsFeatureKey, fromGraphic.reducer),
    StoreModule.forFeature(fromCustomer.customerFeatureKey, fromCustomer.reducer),
    StoreModule.forFeature(fromProducts.productsFeatureKey, fromProducts.productReducer),
    EffectsModule.forFeature([InvoiceEffects, GraphEffects, CustomerEffects, ProductsEffects]),
  ],
  exports: [
    InvoiceListComponent,CustomerFormComponent
  ],
  providers:[
    NgxModalService,
    FormInvoiceService,

  ]
})
export class CustomerModule { }
