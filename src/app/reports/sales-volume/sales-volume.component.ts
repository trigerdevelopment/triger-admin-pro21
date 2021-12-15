import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReportsService } from 'src/app/services/shared/reports.service';
import { SalesVolumeState } from '../store/reducers/volume.reducers';

import * as SalesVolumeSelector from '../store/selectors/volume.selectors';
import * as SalesVolumeActions from '../store/actions/volume.actions';

@Component({
  selector: 'app-sales-volume',
  templateUrl: './sales-volume.component.html',
  styleUrls: ['./sales-volume.component.css']
})
export class SalesVolumeComponent implements OnInit {

  vm$: Observable<SalesVolumeSelector.SalesVolumeSupport>;
  query: string='';


  constructor(
    public store: Store<SalesVolumeState>

    ) {




    }

  customers:any[] =[];
  salesVol:any[] = [];
  ceroValue=0;
  newCustomers :any[] = [];
  sumJaun:number=0;
  sumFeb:number=0;
  sumMar:number=0;
  sumApr:number=0;
  sumMay:number=0;
  sumJun:number=0;
  sumJul:number=0;
  sumAug:number=0;
  sumSep:number=0;
  sumOct:number=0;
  sumNov:number=0;
  sumDic:number=0;
  totalSales:number=0;
  totalCosts:any;

  ngOnInit(): void {

    this.dispatchAction();
    this.store.pipe(select(SalesVolumeSelector.selectSalesSelectorModel)).subscribe(res => {

      if(res.data){
        this.salesVol = res.data;
      }
      this.getSales();

    } );

    this.initialSum();


  }

  ngOnDestroy() {
    this.initialSum();
  }

  initialSum() {

      this.sumJaun =0;
      this.sumFeb =0;
      this.sumMar =0;
      this.sumApr =0;
      this.sumMay =0;
      this.sumJun =0;
      this.sumJul =0;
      this.sumAug =0;
      this.sumSep =0;
      this.sumOct =0;
      this.sumNov =0;
      this.sumDic =0;
      this.totalSales=0;


  }

  getSales() {

    for(let i = 0; i < this.salesVol.length; i++) {

      this.sumJaun += this.salesVol[i].january;
      this.sumFeb += this.salesVol[i].february;
      this.sumMar += this.salesVol[i].march;
      this.sumApr += this.salesVol[i].april;
      this.sumMay += this.salesVol[i].may;
      this.sumJun += this.salesVol[i].june;
      this.sumJul += this.salesVol[i].july;
      this.sumAug += this.salesVol[i].august;
      this.sumSep += this.salesVol[i].september;
      this.sumOct += this.salesVol[i].october;
      this.sumNov += this.salesVol[i].november;
      this.sumDic += this.salesVol[i].december;
    }

    this.totalSales = this.sumJaun + this.sumFeb+ this.sumMar + this.sumApr+
                      this.sumMay+this.sumJun+this.sumJul+this.sumAug+this.sumSep+
                      this.sumOct+this.sumNov+this.sumDic;
  }

  selectYear(event){
    this.query = '?date='.concat(event.target.value);
    this.dispatchAction();

    }

  dispatchAction() {
    this.store.dispatch(SalesVolumeActions.loadSalesVolumeByMonth({ query: this.query }));
    }

}
