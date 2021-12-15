import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QueryService } from 'src/app/customer/query.service';

import * as GastosActions from '../store/actions/gastos.actions';
import * as SalesActions from '../store/actions/sales.actions';
import * as CostsActions from '../store/actions/costs.actions';
import { CostsState } from '../store/reducers/costs.reducers';
import { GastosState } from '../store/reducers/gastos.reducers';
import { SalesState } from '../store/reducers/sales.reducers';

@Component({
  selector: 'app-filter2',
  templateUrl: './filter2.component.html',
  styleUrls: ['./filter2.component.css']
})
export class Filter2Component implements OnInit {
  isLoading: boolean = false;
  @Input() totalSales=0;
  isFilter: boolean = false;
  volume: number =0;
  years:any[]= [2019,2020,2021,2022]
  query: string='';


  constructor(
    public queryService: QueryService,
    private store: Store<GastosState>,
    private storeSales:Store<SalesState>,
    private costsSales:Store<CostsState>,
    ) { }

  ngOnInit(): void {
    this.dispatchAction();
  }

  addFilter(){}

 quitarFiltro() {
  this.isFilter = false;
  this.query = '';
}

reload(){
  this.dispatchAction();
}

selectYear(event){
this.query = '?date='.concat(event.target.value);
this.dispatchAction();

}

dispatchAction() {
this.store.dispatch(GastosActions.loadGastosByMonth({ query: this.query }));
this.storeSales.dispatch(SalesActions.loadSalesByMonth({ query: this.query }));
this.costsSales.dispatch(CostsActions.loadCostsByMonth({ query: this.query }));
}

}
