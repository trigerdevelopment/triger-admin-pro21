import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QueryService } from 'src/app/customer/query.service';
import { ProductionState } from '../../store/reducers/productions.reducers';
import * as ProductionSelector from '../../store/selectors/productions.selectors';
import * as ProductionActions from '../../store/actions/production.actions';

@Component({
  selector: 'app-production-filter',
  templateUrl: './production-filter.component.html',
  styleUrls: ['./production-filter.component.css']
})
export class ProductionFilterComponent implements OnInit {

  query: string;
  initialDate: string;
  finalDate: string;
  isFilter: boolean = false;
  isLoading: boolean = false;
  totalSales: number = 0;
  volume:any=0;
  @Input() basecontroller: string='';
  @Input() filter1: any;

  vm$: Observable<ProductionSelector.PaginatorSupport>;

  pages = [
    { id: 10, name: "10" },
    { id: 25, name: "25" },
    { id: 50, name: "50" },
    { id: 100, name: "100" },
  ];


  constructor(public queryService: QueryService,
    private store: Store<ProductionState>,
    // public filterService: FilterService
    ) { }

  ngOnInit(): void {

    /*-------------------------  LIMPIAMOS EL FILTRO Y SE DISPARA LA ACCION DE CARGAR LAS INVOICES  --------------------------------*/
    this.cleanFilter();
    // this.dispatchAction();

    // this.store.pipe(select(GraphSelector.selectInvoiceSupportModel))
    // .subscribe(res =>{
    //    if (res.graph) {
    //       let data = res.graph.map(r=> r.value);
    //       this.volume = 0;
    //       for(let i = 0; i < data.length; i++) {
    //         this.volume = this.volume + data[i];
    //       }

    //   }
    //  })


    //  this.store.pipe(select(GraphSelector.selectGraphBarSupport)).subscribe(res => {
    //   if(res.barGraph){
    //     let result = res.barGraph.map(r=> r.value);
    //     this.totalSales = 0;
    //     for(let i = 0; i < result.length; i++) {
    //       this.totalSales = this.totalSales + result[i];
    //     }
    //   }
    // })

  }

  addFilter() {

    this.isFilter = true;
    this.setFilter();
    this.dispatchAction();
  }

  quitarFiltro() {
    this.isFilter = false;
    this.cleanFilter();
    // this.dispatchAction();
    // this.store.dispatch(GraphActions.loadPieGraph());
    // this.store.dispatch(GraphActions.loadGraphics());

  }

  setEventPageSize(event) {

    this.queryService.filter1.pageSize = event.target.value;
    this.setFilter();

    this.dispatchAction();
  }



  cleanFilter() {
    this.isFilter = false;
    this.queryService.filter2 = {
      'initialDate': '',
      'finalDate': '',
      'product': '',
      'code': '',
      'batch': '',
      'quantiry': '',
      'pageNo': 0,
      'pageSize': '',
      'sortBy': '',
      'orderBy': true

    }
    this.query = this.queryService.createFilterUrl(
      {
       iniDate: '',
       finalDate: '',
       iniFolio: '',
       finalFolio: '',
       company: '',
       sucursal: '',
       total: '',
       total2: '',
       pageNo: null,
       pageSize: '',
       sortBy: '',
       orderBy: true,

      })

    this.dispatchAction();

  }

   setFilter(){

    this.query = this.queryService.productionFilter(
      {
       initialDate: this.queryService.filter2.initialDate,
       finalDate: this.queryService.filter2.finalDate,
       product: this.queryService.filter2.product,
       code: this.queryService.filter2.code,
       batch: this.queryService.filter2.batch,
       quantity: this.queryService.filter2.quantity,
       pageSize: this.queryService.filter1.pageSize,
       orderBy: true
       })

      //  this.store.dispatch(GraphActions.loadGraphByQuery({query:this.query}));
   }



   dispatchAction() {

    this.store.dispatch(ProductionActions.loadProduction({ query: this.query }));
  }
}
