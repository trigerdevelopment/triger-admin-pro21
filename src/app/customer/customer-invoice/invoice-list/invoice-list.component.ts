import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/customer';
import { environment } from 'src/environments/environment';
import { QueryService } from '../../query.service';

/*-------------------- Store Selectors and Actions-------------------------- */
import * as InvoiceActions from '../../store/actions/invoice.actions';
import * as InvoiceSelector from '../../store/selectors/invoice.selectors';
import { InvoiceState } from '../../store/reducers/invoice.reducer';
import { NgxModalService } from 'src/app/services/shared/ngx-modal.service';
import { MultipleFileComponent } from 'src/app/modals/multiple-file/multiple-file.component';
import { InvoiceFormModalComponent } from 'src/app/modals/invoice-form-modal/invoice-form-modal.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  query: string;
  invoices: Invoice[] = [];
  orderBy: boolean = true;
  sortBy: string = '';
  url: string = '/invoice/invoice-by-query?';
  basecontroller = '/invoice/invoice-by-query?';
  number:number =null;
  isLoading:boolean = false;
  totalSales: number = 0;
  volume:number =0;
  isFilter:boolean=false;
  vm$: Observable<InvoiceSelector.PaginatorSupport>;
  pages = [
    { id: 10, name: "10" },
    { id: 25, name: "25" },
    { id: 50, name: "50" },
    { id: 100, name: "100" },
  ];
  constructor(
    private store: Store<InvoiceState>,
    private ngxModalService: NgxModalService,
    public queryService: QueryService,
    private router: Router) { }

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(InvoiceSelector.selectInvoiceSupportModel));
    console.log('VM$ ', this.vm$);

  }

  functionSortBy(sortBy: string) {

    this.orderBy = !this.orderBy;
    this.sortBy = sortBy;

    this.query = this.queryService.createFilterUrl(
      { iniDate: '', finalDate: '', iniFolio: 0, finalFolio: '', company:'', sucursal:'', total:null, total2:null, pageNo:null,pageSize:null,sortBy:this.sortBy,orderBy:this.orderBy })
    this.store.dispatch(InvoiceActions.loadInvoices({ query: this.query }))

  }
  mostrarMultipleModal() {
    // this._modalService.mostrarMultipleFileUploadModal(this.idModal, this.URL_CUSTOMER);
    this.ngxModalService.show(MultipleFileComponent);
  }

  showInvoiceFormModal(){
    this.ngxModalService.show(InvoiceFormModalComponent);

  }

  invoiceDetail(event){
    // this.router.navigate(['/invoice'], { queryParams: { order: 'popular' } });
    this.router.navigate(['customer/invoice-details', event.id]);


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
      this.store.dispatch(InvoiceActions.deleteInvoice({id: id}));

    }
  })


  }



}
