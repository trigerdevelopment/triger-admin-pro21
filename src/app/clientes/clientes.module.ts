import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasComponent } from './ventas/ventas.component';
import { ClientesComponent } from './clientes.component';
import { CLIENTES_ROUTES } from './clientes.routes';
import { SharedModule } from '../shared/shared.module';
import { FacturasComponent } from './facturas/facturas.component';
import { ModalUploadComponent } from '../modals/modal-upload/modal-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultadosDeLaBusquedaComponent } from './resultados-de-la-busqueda/resultados-de-la-busqueda.component';
import { ChartsModule } from 'ng2-charts';
import { MultipleUploadModalComponent } from './multiple-upload-modal/multiple-upload-modal.component';
import { MultipleFileUploadModalComponent } from './multiple-file-upload-modal/multiple-file-upload-modal.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PaymentComponent } from './payment/payment.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { InvoiceItemsComponent } from './invoice-list/invoice-items/invoice-items.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FilterComponent } from './filter/filter.component';
import { FilterOrderByComponent } from './filter-order-by/filter-order-by.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { StoreModule } from '@ngrx/store';
import { invoiceReducer } from './store/reducers/facturas.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FacturasEffects } from './store/effects/facturas.effects';
import { InvoiceEffectsArray } from './store/effects/index.facturas.effects';
import { MultipleFileComponent } from '../modals/multiple-file/multiple-file.component';
import { NgxModalService } from '../services/shared/ngx-modal.service';
import { VentasPorClienteComponent } from './ventas-por-cliente/ventas-por-cliente.component';
import { FilterSalesReportComponent } from './filter-sales-report/filter-sales-report.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SalesByCustomerComponent } from './sales-by-customer/sales-by-customer.component';
import { SalesCustomerByYearComponent } from './ventas-por-cliente/sales-customer-by-year/sales-customer-by-year.component';
import { customerReducer } from './store/reducers/customers.reducer';
import { customerReducers } from './store/customer.reducer.index';



@NgModule({
  declarations: [
    ClientesComponent,
    VentasComponent,
    FacturasComponent,
    ResultadosDeLaBusquedaComponent,
    MultipleUploadModalComponent,
    MultipleFileUploadModalComponent,
    PaymentComponent,
    PaymentModalComponent,
    InvoiceListComponent,
    InvoiceItemsComponent,
    FilterComponent,
    FilterOrderByComponent,
    PaginatorComponent,
    MultipleFileComponent,
    VentasPorClienteComponent,
    FilterSalesReportComponent,
    SalesByCustomerComponent,
    SalesCustomerByYearComponent,
    //  FacturasSortPipe
    ],
  imports: [
    CommonModule,
    ModalModule.forChild(),
    StoreModule.forFeature('customerReducer',customerReducers),
    EffectsModule.forFeature(InvoiceEffectsArray),
    JwPaginationModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    FileUploadModule,
    SharedModule,
    ChartsModule,
    ModalModule.forRoot(),
    // FacturasSortPipe,
    CLIENTES_ROUTES
  ],
  exports:[InvoiceListComponent],
  providers: [
    NgxModalService
  ]
})
export class ClientesModule { }
