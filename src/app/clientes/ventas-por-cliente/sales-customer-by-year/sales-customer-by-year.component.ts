import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-sales-customer-by-year',
  templateUrl: './sales-customer-by-year.component.html',
  styleUrls: ['./sales-customer-by-year.component.css']
})
export class SalesCustomerByYearComponent implements OnInit {

  @Input() clientes:any[];
  salesClientes:any []=[];
 @Input() ttlanualSales:number=0;
 @Input() salesJan:number=0;
 @Input() salesFeb:number=0;
 @Input() salesMar:number=0;
 @Input() salesAbr:number=0;
 @Input() salesMay:number=0;
 @Input() salesJun:number=0;
 @Input() salesJul:number=0;
 @Input() salesAug:number=0;
 @Input() salesSep:number=0;
 @Input() salesOct:number=0;
 @Input() salesNov:number=0;
 @Input() salesDic:number=0;

  constructor() { }

  ngOnInit(): void {
  }



}
