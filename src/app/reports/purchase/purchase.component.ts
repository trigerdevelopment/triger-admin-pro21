import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ReportsService } from 'src/app/services/shared/reports.service';
import { ReportState } from 'src/app/store/reducers/report.reducers';
import * as ReportPurchaseSelector from '../../store/selectors/purchase.report.selectors';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {


  constructor(
    public reportServcie: ReportsService,
    public store: Store<ReportState>) { }

  suppliers:any[] =[];
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

  ngOnInit(): void {

    this.initialSum();

    this.reportServcie.getPurchaseByMonthByCustomer('').subscribe(res => {
      console.log('RES ', res);
      this.suppliers = res;
      this.getPurchase(this.suppliers);
    })

    this.store.pipe(select(ReportPurchaseSelector.selectPurchaseSupportModel)).subscribe(res => {
      this.suppliers = [];
      console.log('COMPRA ES ', res.purchasedata);
      this.suppliers = res.purchasedata;
      console.log('SUPPLIERS ', this.suppliers);
      if(this.suppliers){
        this.initialSum();
        this.getPurchase(this.suppliers);
      }
      // console.log('CUSTOMERS ', this.customers.length);
      // this.getSum();

    })
  }

  ngOnDestroy() {
    this.initialSum();
  }

  initialSum() {
    // let sumJaun = 0;

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

  getPurchase(arr: any[]) {

    console.log('this arr ', arr.length);
    for(let i = 0; i < this.suppliers.length; i++) {
      console.log('SUPPLIERS ', this.suppliers[i]);

      this.sumJaun += this.suppliers[i].january;
      this.sumFeb += this.suppliers[i].february;
      this.sumMar += this.suppliers[i].march;
      this.sumApr += this.suppliers[i].april;
      this.sumMay += this.suppliers[i].may;
      this.sumJun += this.suppliers[i].june;
      this.sumJul += this.suppliers[i].july;
      this.sumAug += this.suppliers[i].august;
      this.sumSep += this.suppliers[i].september;
      this.sumOct += this.suppliers[i].october;
      this.sumNov += this.suppliers[i].november;
      this.sumDic += this.suppliers[i].december;
    }

    this.totalSales = this.sumJaun + this.sumFeb+ this.sumMar + this.sumApr
                      this.sumMay+this.sumJun+this.sumJul+this.sumAug+this.sumSep
                      this.sumOct+this.sumNov+this.sumDic;
  }


}
