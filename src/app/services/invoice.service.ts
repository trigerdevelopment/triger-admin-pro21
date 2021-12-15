import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {  Pageable } from '../models/customer';
import { URL_SERVICIOS } from './settings/url';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  httpHeaders: HttpHeaders;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private http: HttpClient,private alertService: ToastrService) {}

  // addInvoice(invoice: any): Observable<Invoice> {
  //   this.httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
  //   const req = new HttpRequest<Invoice>(
  //     "POST",
  //     "http://localhost:8080/api/invoice/add",
  //     invoice,
  //     {
  //       headers: this.httpHeaders,
  //       reportProgress: true,
  //       responseType: "text"
  //     }
  //   );
    // return this.http.request<Invoice>(req)
    // .pipe(
    //   // tap(() => {
    //   //   // this._refreshNeeded$.next();
    //   //  // this.notificacion.emit();
    //   // })
    // );
  // }





  getAllInvoice(): Observable<Pageable> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Pageable>(URL_SERVICIOS+'/invoice/', { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )
  }

  getAllInvoiceByQuery(query: string): Observable<Pageable> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Pageable>(URL_SERVICIOS+'/invoice/invoice-by-query/?'+`${query}`, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )
  }

  getAllSupplierInvoiceByQuery(query: string): Observable<Pageable> {
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Pageable>(URL_SERVICIOS+'/invoice/supplier-invoice-by-query/?'+`${query}`, { headers: this.httpHeaders })
      .pipe(
        catchError(err =>{
          console.error(err);
        console.log('ERRORRZZOTE');

          this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);

          return throwError(err)
        })
      )
  }

  addInvoice(inv: string): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(URL_SERVICIOS+'/invoice/add',inv, { headers: this.httpHeaders })
      .pipe(
     catchError(err =>{
       console.error(err);
      this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);
       return throwError(err)
     })
      );
  }

  addSuppilerInvoice(inv: string): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(URL_SERVICIOS+'/invoice/supplier-add',inv, { headers: this.httpHeaders })
      .pipe(
     catchError(err =>{
       console.error(err);
      this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);
       return throwError(err)
     })
      );
  }

  getInvoiceById(id: any): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});

  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(URL_SERVICIOS+'/invoice/id?'+`id=${id}`, { headers: this.httpHeaders })
      .pipe(
        catchError(err =>{
          console.error(err);
         this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);
          return throwError(err)
        })
      )
  }

  deleteInvoiceById(id: any): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  // this.httpHeaders = new HttpHeaders()
  // .set('Content-Type', 'application/json')
  // .set('Accept', 'application/json');
  console.log('BORRARA');

    return this.http.delete(`${URL_SERVICIOS}/${id}` );
    // return this.http.delete<String>(URL_SERVICIOS+'/invoice/delete/'+ `${id}`, { headers: this.httpHeaders })
      // .pipe(
      //   // tap(() => {
      //   //   // this._refreshNeeded$.next;
      //   // })
      // )
  }
}
