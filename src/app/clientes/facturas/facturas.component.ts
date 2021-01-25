import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from '@ngrx/store';
import { Filter, Invoice} from "../../models/customer";
import { filterBy } from '../store/actions/facturas.actions';
import { AppState } from 'src/app/app.reducers';
import { Observable, Subscription } from "rxjs";
import * as facturasSelector from '../store/selectors/facturas.selectors';
import { NgxMaskModule } from "ngx-mask";
import { NgxModalService } from "src/app/services/shared/ngx-modal.service";
import { ModalUploadComponent } from "src/app/modals/modal-upload/modal-upload.component";
import { MultipleFileComponent } from "src/app/modals/multiple-file/multiple-file.component";
import { GetService } from "src/app/services/get-service/get-service.service";
import { CustomerState } from "../store/customer.reducer.index";


@Component({
  selector: "app-facturas",
  templateUrl: "./facturas.component.html",
  styleUrls: ["./facturas.component.css"],
})
export class FacturasComponent implements OnInit, OnDestroy {

  storeSuscribe: Subscription;
  invoices: Invoice[]=[];

  totalPages: number = 1;
  isLastPage: boolean = false;
  isFilter: boolean = false;
  isLoading: boolean = false;
  first: boolean = true;

  filter: Filter = {
    'iniDate': '',
    'finalDate': '',
    'serie': '',
    'iniFolio': '',
    'finalFolio': '',
    'company': '',
    'sucursal': '',
    'total': '',
    'total2': '',
    'pageNo': 0,
    'pageSize': '',
    'sortBy': '',
    'orderBy': true

  }

  pageSize: any;
  currentPage: any = "0";
  numberOfElements: any = "0";
  isAsc: boolean = true;
  orderBy: boolean = false;
  totalSales: number = 0;

  filter$: Observable<any>;


  constructor(private store: Store<CustomerState>,
              private ngxModalService: NgxModalService,
              private getService: GetService) {

    this.store.dispatch(filterBy({ filter: this.filter }));
    this.storeSuscribe =
      this.store.select('customer').subscribe((invoices) => {

        const invo = { ...invoices.invoices }
        console.log('INVOICES ', invoices);

        this.invoices = invo.content;

        const pagez = invo.numberOfElements;
        this.numberOfElements = invo.totalElements;
        this.currentPage = invo.number;
        this.totalPages = invo.totalPages;
        this.pageSize = invo.size;
        this.isLastPage = invo.last;
        this.first = invo.first;

      });
  }


  ngOnDestroy(): void {
    this.storeSuscribe.unsubscribe();

  }



  ngOnInit(): void {
    this.invoices=[];

    this.filter$ = this.store.pipe(
      select(facturasSelector.selectName)
    );
    this.filter$.subscribe(res => {
      this.filter = res
    });

  }


  mostrarMultipleModal() {
    // this._modalService.mostrarMultipleFileUploadModal(this.idModal, this.URL_CUSTOMER);
    this.ngxModalService.show(MultipleFileComponent);

  }

  mostrarPaymentModal() {
    // this._modalService.mostrarPaymentModal(this.idModal, this.URL_CUSTOMER);
  }




  functionSortBy(event: any) {
    this.isAsc = !this.isAsc;
    this.filter.sortBy = event
    this.filter.orderBy = this.isAsc;
    this.store.dispatch(filterBy({ filter: this.filter }));

  }


  /* ------------Se piden las Facturas por Pagina, si es por primera vez inicia desde la pagian cero-------- */




  funcTotalSales() {

    const stringQuery =  `iniDate=${this.filter.iniDate}&finalDate=${this.filter.finalDate}`
    this.getService.getSalesByDate('/report/get-sales-by-date', stringQuery).subscribe(res => {
      this.totalSales = res;
    })

  }


}
