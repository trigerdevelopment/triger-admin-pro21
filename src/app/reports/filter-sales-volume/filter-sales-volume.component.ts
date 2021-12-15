import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QueryService } from 'src/app/customer/query.service';

import * as SalesVolumeActions from '../../reports/store/actions/volume.actions';
import { SalesVolumeState } from '../store/reducers/volume.reducers';


@Component({
  selector: 'app-filter-sales-volume',
  templateUrl: './filter-sales-volume.component.html',
  styleUrls: ['./filter-sales-volume.component.css']
})
export class FilterSalesVolumeComponent implements OnInit {
  isLoading: boolean = false;
  @Input() totalSales=0;
  isFilter: boolean = false;
  // totalSales: number = 0;
  volume: number =0;
  years:any[]= [2019,2020,2021,2022]
  query: string='';

  constructor(
    public queryService: QueryService,
    private store: Store<SalesVolumeState>
    ) { }

  ngOnInit(): void {
  }

  addFilter(): void {}

 quitarFiltro() {
      this.isFilter = false;
      this.query = '';
  }

  selectYear(event){
    this.query = '?date='.concat(event.target.value);
    this.dispatchAction();

  }

  dispatchAction() {

    this.store.dispatch(SalesVolumeActions.loadSalesVolumeByMonth({ query: this.query }));
  }

}
