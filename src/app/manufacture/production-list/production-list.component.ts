import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QueryService } from 'src/app/customer/query.service';
import * as ProductionActions from '../store/actions/production.actions';
import * as ProductionSelector from '../store/selectors/productions.selectors';
import Swal from 'sweetalert2'
import { ProductionState } from '../store/reducers/productions.reducers';

@Component({
  selector: 'app-production-list',
  templateUrl: './production-list.component.html',
  styleUrls: ['./production-list.component.css']
})
export class ProductionListComponent implements OnInit {


  query: string;
  production: any[] = [];
  orderBy: boolean = true;
  sortBy: string = '';
  url: string = '/invoice/invoice-by-query?';
  basecontroller = '/invoice/invoice-by-query?';
  number:number =null;
  isLoading:boolean = false;
  totalSales: number = 0;
  volume:number =0;
  isFilter:boolean=false;
  vm$: Observable<ProductionSelector.PaginatorSupport>;
  pages = [
    { id: 10, name: "10" },
    { id: 25, name: "25" },
    { id: 50, name: "50" },
    { id: 100, name: "100" },
  ];
  constructor(
    private store: Store<ProductionState>,
    // private ngxModalService: NgxModalService,
    public queryService: QueryService,
    private router: Router) { }

  ngOnInit(): void {
    this.vm$ = this.store.pipe(select(ProductionSelector.selectInvoiceSupportModel));
    console.log('VM$ ', this.vm$);

  }


  functionSortBy(sortBy: string) {

    this.orderBy = !this.orderBy;
    this.sortBy = sortBy;

    this.query = this.queryService.createFilterUrl(
      { iniDate: '', finalDate: '', iniFolio: 0, finalFolio: '', company:'', sucursal:'', total:null, total2:null, pageNo:null,pageSize:null,sortBy:this.sortBy,orderBy:this.orderBy })
    this.store.dispatch(ProductionActions.loadProduction({ query: this.query }))

  }
  mostrarMultipleModal() {
    // this._modalService.mostrarMultipleFileUploadModal(this.idModal, this.URL_CUSTOMER);
    // this.ngxModalService.show(MultipleFileComponent);
  }

  showInvoiceFormModal(){
    // this.ngxModalService.show(InvoiceFormModalComponent);

  }

  invoiceDetail(event){
    // this.router.navigate(['/invoice'], { queryParams: { order: 'popular' } });
    this.router.navigate(['customer/invoice-details', event.id]);


  }

  deleteInvoice(event:any){
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
      this.store.dispatch(ProductionActions.deleteProduction({id: id}));

    }
  })


  }



}
