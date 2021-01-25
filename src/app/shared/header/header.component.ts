//
/********************************************************************************************************/
/********************************************************************************************************/
/********************************************************************************************************/
/**************************Ejemplo de Busqueda en Proveedores********************************************/


// ejem: proveedor facturas: total>3000&fecha>2020/02/28&fecha<2020/03/01
// las fechas > es mayor o igual que, para total es igual
// name=fularno


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from 'src/app/services/get-service/get-service.service';
import { ModalService } from 'src/app/services/shared/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   constructor() { }

  ngOnInit(): void {

  }

}
