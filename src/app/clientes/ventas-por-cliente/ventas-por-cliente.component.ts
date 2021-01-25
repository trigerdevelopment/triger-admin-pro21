import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Clientes, Customer } from 'src/app/models/customer';
import { GetService } from 'src/app/services/get-service/get-service.service';
import { salesState } from '../store/reducers/sales.reducer';

@Component({
  selector: 'app-ventas-por-cliente',
  templateUrl: './ventas-por-cliente.component.html',
  styleUrls: ['./ventas-por-cliente.component.css']
})
export class VentasPorClienteComponent implements OnInit {

  clientes: Clientes[]= [];
  salesClientes:any []=[];
  ttlanualSales:number=0;
  salesJan:number=0;
  salesFeb:number=0;
  salesMar:number=0;
  salesAbr:number=0;
  salesMay:number=0;
  salesJun:number=0;
  salesJul:number=0;
  salesAug:number=0;
  salesSep:number=0;
  salesOct:number=0;
  salesNov:number=0;
  salesDic:number=0;

  constructor(private getService: GetService,
              private store: Store<salesState>) { }

  ngOnInit(): void {

    this.getService.getSalesByCustomer().subscribe(res => {
      this.clientes = res;
      console.log('CLIENTES ', this.clientes);
      this.monthSales();
      this.clienteAnualSales();
    })
  }

  monthSales(){

    for (let index = 0; index < this.clientes.length; index++) {
     this.salesJan = this.clientes[index].january + this.salesJan;
     this.salesFeb = this.clientes[index].february + this.salesFeb;
     this.salesMar = this.clientes[index].march + this.salesMar
     this.salesAbr = this.clientes[index].april + this.salesAbr
     this.salesMay = this.clientes[index].may + this.salesMay
     this.salesJun = this.clientes[index].june + this.salesJun
     this.salesJul = this.clientes[index].july + this.salesJul
     this.salesAug = this.clientes[index].august + this.salesAug
     this.salesSep = this.clientes[index].september + this.salesSep
     this.salesOct = this.clientes[index].october + this.salesOct
     this.salesNov= this.clientes[index].november + this.salesNov
     this.salesDic= this.clientes[index].december + this.salesDic
    }
  }

  clienteAnualSales(){
    for (let index = 0; index < this.clientes.length; index++) {
      this.salesClientes[index] = this.clientes[index].january + this.clientes[index].february + this.clientes[index].march + this.clientes[index].april+
      this.clientes[index].may+this.clientes[index].june+this.clientes[index].july + this.clientes[index].august + this.clientes[index].september +
      this.clientes[index].october+this.clientes[index].november+this.clientes[index].december;

    }

    this.anualSales();
  }

  anualSales(){
    for (let index = 0; index < this.salesClientes.length; index++) {
      this.ttlanualSales = this.salesClientes[index] + this.ttlanualSales;

    }
  }

}
