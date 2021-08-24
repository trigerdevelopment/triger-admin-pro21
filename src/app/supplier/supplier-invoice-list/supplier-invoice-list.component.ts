import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QueryService } from 'src/app/customer/query.service';
import { Invoice } from 'src/app/models/customer';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';
import { SupplierInvoiceState } from '../store/reducers/supplier-invoice.reducer';

import Swal from 'sweetalert2'

import * as invoiceActions from '../store/actions/supplier-invoice.actions'
import { MultipleFileComponent } from 'src/app/modals/multiple-file/multiple-file.component';
import { InvoiceFormModalComponent } from 'src/app/modals/invoice-form-modal/invoice-form-modal.component';

import * as invoiceSupplierSelector from '../store/selectors/invoice-supplier.selector';
import * as invoiceActionsFromCustomer from '../../customer/store/actions/invoice.actions';
import { environment } from 'src/environments/environment';
import { ModalUploadXmlSupplierComponent } from 'src/app/modals/modal-upload-xml-supplier/modal-upload-xml-supplier.component';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-supplier-invoice-list',
  templateUrl: './supplier-invoice-list.component.html',
  styleUrls: ['./supplier-invoice-list.component.css']
})
export class SupplierInvoiceListComponent implements OnInit {

  query: string;
  invoices: Invoice[] = [];
  orderBy: boolean = true;
  sortBy: string = '';
  url: string = '/invoice/supplier-invoice-by-query?';
  basecontroller = '/invoice/supplier-invoice-by-query?';


  vm$: Observable<invoiceSupplierSelector.PaginatorSupport>;

  constructor(
    private store: Store<SupplierInvoiceState>,
    private ngxModalService: NgxModalService,
    private queryService: QueryService,
    private invoiceService: InvoiceService,
    private router: Router) { }

  ngOnInit(): void {


    this.vm$ = this.store.pipe(select(invoiceSupplierSelector.selectInvoiceSupportModel))


  }

  functionSortBy(sortBy: string) {

    this.orderBy = !this.orderBy;
    this.sortBy = sortBy;

    this.query = this.queryService.createFilterUrl(
      { iniDate: '', finalDate: '', iniFolio: 0, finalFolio: '', company:'', sucursal:'', total:null, total2:null, pageNo:null,pageSize:null,sortBy:this.sortBy,orderBy:this.orderBy })
    this.store.dispatch(invoiceActions.loadSupplierInvoices({ query: this.query }))

  }
  mostrarMultipleModal() {
    // this._modalService.mostrarMultipleFileUploadModal(this.idModal, this.URL_CUSTOMER);
    this.ngxModalService.show(ModalUploadXmlSupplierComponent);
  }

  showInvoiceFormModal(){
    this.ngxModalService.show(InvoiceFormModalComponent);

  }

  pagarFactura(event){
      this.router.navigate(['supplier/invoice-details', event.id]);
    // this.router.navigate(['/invoice'], { queryParams: { order: 'popular' } });

  }

  deleteInvoice(event:Invoice){
   const id = event.id

  Swal.fire({
    title: 'Estas seguro?',
    text: "Esta accion no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
        'El Archivo se ha eliminado.',
        'success'
      )
      this.store.dispatch(invoiceActions.deleteSupplierInvoice({id: id}));
      // this.invoiceService.deleteInvoiceById(id).subscribe(res =>{

      // });
    }
  })


  }


}
