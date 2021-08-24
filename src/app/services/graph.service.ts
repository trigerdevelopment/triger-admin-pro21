import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  httpHeaders: HttpHeaders;
  URL_SERVICIOS = environment.baseUrl;

  constructor(private http: HttpClient) { }

  /************************************************************************************************
        REGRESA LOS DATOS DE VENTAS EN PESOS  EN EL AÑO EN CURSO PARA LA GRFICA DE BARRAS
  *************************************************************************************************/

        getDataSalesBarThisYear(): Observable<any[]> {
          this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
          return this.http.get<any[]>(this.URL_SERVICIOS + '/graphic/sales-month', { headers: this.httpHeaders })
          }

 /************************************************************************************************
        REGRESA LOS DATOS DE VENTAS EN VOLUMEN DEL AÑO EN CURSO PARA LA GRAFICA DE PIE
 *************************************************************************************************/

 getDataSalesVolumeThisYear(): Observable<any[]> {
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  return this.http.get<any[]>(this.URL_SERVICIOS + '/graphic/products-volume', { headers: this.httpHeaders })
    }


 /************************************************************************************************
        REGRESA LOS DATOS DE VENTAS EN VOLUMEN  ENTRE FECHAS PARA LA GRAFICA DE PIE
 *************************************************************************************************/

  getSalesPieVolumeByDate(query:string): Observable<any[]> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
     return this.http.get<any[]>(this.URL_SERVICIOS + '/graphic/products-volume-by-date?'+ query, { headers: this.httpHeaders })
       }

 /************************************************************************************************
        REGRESA LOS DATOS DE VENTAS EN PESOS  ENTRE FECHAS PARA LA GRFICA DE BARRAS
 *************************************************************************************************/

 getSalesBarByDate(query:string): Observable<any[]> {
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
   return this.http.get<any[]>(this.URL_SERVICIOS + '/graphic/sales-month-by-dates?'+ query, { headers: this.httpHeaders })
     }

}
