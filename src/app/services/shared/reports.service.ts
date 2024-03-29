import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
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


  getSalesCostByMonth(query: string): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${URL_SERVICIOS}/report/get-sales-cost/${query}`, { headers: this.httpHeaders })
      .pipe(
     catchError(err =>{
       console.error(err);
      this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);
       return throwError(err)
     })
      );
  }

  getSalesByMonth(query: string): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${URL_SERVICIOS}/income-statement/get-sales/${query}`, { headers: this.httpHeaders })
      .pipe(
     catchError(err =>{
       console.error(err);
      this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);
       return throwError(err)
     })
      );
  }

  getVolumeSalesByMonth(query: string): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${URL_SERVICIOS}/report/get-sales-volume/${query}`, { headers: this.httpHeaders })
      .pipe(
     catchError(err =>{
       console.error(err);
      this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);
       return throwError(err)
     })
      );
  }

  getExpenseByMonth(query: string): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${URL_SERVICIOS}/income-statement/get-expenses/${query}`, { headers: this.httpHeaders })
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

  getIncomeStatements(query: string): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${URL_SERVICIOS}/expense-type/get-expenses-by-month/${query}`, { headers: this.httpHeaders })
      .pipe(
     catchError(err =>{
       console.error(err);
      this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);
       return throwError(err)
     })
      );
  }

}
