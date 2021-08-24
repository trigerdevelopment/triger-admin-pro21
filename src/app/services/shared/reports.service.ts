import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { URL_SERVICIOS } from 'src/app/settings/settings';
import { environment } from 'src/environments/environment';
import { URL_SERVICIOS } from '../settings/url';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient,private alertService: ToastrService) {}


  getSalesByMonthByCustomer(query: string): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${URL_SERVICIOS}/report/get-sales/${query}`, { headers: this.httpHeaders })
      .pipe(
     catchError(err =>{
       console.error(err);
      this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);
       return throwError(err)
     })
      );
  }

  getPurchaseByMonthByCustomer(query: string): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${URL_SERVICIOS}/purchase/get-purchase-by-month/${query}`, { headers: this.httpHeaders })
      .pipe(
     catchError(err =>{
       console.error(err);
      this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);
       return throwError(err)
     })
      );
  }

}
