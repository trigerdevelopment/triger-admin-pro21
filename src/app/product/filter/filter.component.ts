import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QueryService } from 'src/app/customer/query.service';
import { Filter } from 'src/app/models/customer';
import { FilterProduct } from 'src/app/models/filters';
import { environment } from 'src/environments/environment';
import { loadProducts } from '../store/actions/product.actions';
import { ProductState } from '../store/reducers/product.reducer';
import { PaginatorProductSupport } from '../store/selectors/product.selectors';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  query: string;
  isFilter: boolean = false;
  isLoading: boolean = false;
  totalSales: number = 0;
  @Input() basecontroller: string
  vm$: Observable<PaginatorProductSupport>;

  pages = [
    { id: 10, name: "10" },
    { id: 25, name: "25" },
    { id: 50, name: "50" },
    { id: 100, name: "100" },
  ];

  filter: FilterProduct = {
    'code': '',
    'productName': '',
    'category': '',
    'subCategory': '',
    'unitCost': '',
    'unitPrice': '',
    'pageNo': 0,
    'pageSize': '',
    'sortBy': '',
    'orderBy': true

  }

  constructor(private queryService: QueryService,
    private store: Store<ProductState>) { }

  ngOnInit(): void {
    this.cleanFilter();
    this.dispatchAction();
  }

  addFilter(filter:any) {

    this.isFilter = true;
    this.setFilter();
    this.dispatchAction();
  }

  quitarFiltro() {
    this.isFilter = false;
    this.cleanFilter();
    this.dispatchAction();
  }

  setEventPageSize(event) {

    this.filter.pageSize = event.target.value;
    this.setFilter();
    // this.query = this.queryService.createFilterUrl(
    //   this.filter.iniDate, /* iniDate */
    //   this.filter.finalDate,/*finalDate */
    //   this.filter.iniFolio, /*iniFolio */
    //   this.filter.finalFolio, /*finalFolio */
    //   this.filter.company, /*company */
    //   this.filter.sucursal, /*sucursal */
    //   this.filter.total, /* total */
    //   this.filter.total2, /*total2 */
    //   null, /**pageNo */
    //   this.filter.pageSize,/**pageSize */
    //   '', /**sortBy */
    //   true, /**orderBy */
    //   environment.baseUrl,
    //   // 'api/invoice/get-all-invoice/?'
    //   'api/invoice/invoice-by-query/?'
    // )
    // this.store.dispatch(InvoiceActions.loadInvoices({query: this.query}))
    this.dispatchAction();
  }



  cleanFilter() {
    this.isFilter = false;
    this.filter = {
      'code': '',
      'productName': '',
      'category': '',
      'subCategory': '',
      'unitCost': '',
      'unitPrice': '',
      'pageNo': 0,
      'pageSize': '',
      'sortBy': '',
      'orderBy': true

    }
    this.query = this.queryService.createFilterUrl(
      {
        code: '', product: '', category: '', subCategory: '', unitCost: '', unitPrice: '',  pageNo: null, pageSize: '', sortBy: '', orderBy: true
        // 'api/invoice/get-all-invoice/?'
           })
    this.dispatchAction();

  }

   setFilter(){

    this.query = this.queryService.createFilterUrl(
      {
        code: this.filter.code, product: this.filter.productName, category: this.filter.category, subCategory: this.filter.subCategory, unitCost: this.filter.unitCost, unitPrice: this.filter.unitPrice, pageSize: this.filter.pageSize, orderBy: true,
        // 'api/invoice/get-all-invoice/?'
        })
   }

   dispatchAction() {
    this.store.dispatch(loadProducts({ query: this.query }))

  }

}
