import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Pageable } from '../models/customer';
import { URL_SERVICIOS_BANK } from './settings/url';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  httpHeaders: HttpHeaders;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private http: HttpClient, private alertService: ToastrService) { }

  createExpenseType(inv: string): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(URL_SERVICIOS_BANK+'/bank/bank-movement/create',inv, { headers: this.httpHeaders })
      .pipe(
     catchError(err =>{
       console.error(err);
      this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);
       return throwError(err)
     })
      );
  }

  updateBankMovement(inv: any): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(URL_SERVICIOS_BANK+'/bank/bank-movement/update',inv, { headers: this.httpHeaders })
      .pipe( tap(() => {
        this._refreshNeeded$.next();
      }),
     catchError(err =>{
       console.error(err);
      // this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);
      this.alertService.error('mensaje de error enviado desde el Servidor');
       return throwError(err)
     })
      );
  }

  updateBankingTransaction(bankingTransaction: any): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(URL_SERVICIOS_BANK+'/bank/bank-movement/update',bankingTransaction, { headers: this.httpHeaders })
      .pipe(tap(() => {
        this._refreshNeeded$.next();
      }),
        catchError(err =>{
          console.error(err);
         this.alertService.error('mensaje de error enviado desde el Servidor');
          return throwError(err)
        })
      )
  }

  pushFileBankToStorage(file: File): Observable<HttpEvent<{}>> {
    console.log('file', file);
    const formdata: FormData = new FormData();
    this.httpHeaders = new HttpHeaders({ Accept: "application/json" });
    formdata.append("file", file);
    const req = new HttpRequest(
      "POST",
      `${URL_SERVICIOS_BANK}/excel/upload-bank-movements`,
      formdata,
      {
        headers: this.httpHeaders,
        reportProgress: true,
        responseType: "text"
      }
    );
    return this.http.request(req).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  /*----------- Eliminar Datos Seleccionados -------------*/

  deleteBankingTransactionList(bankingTransaction: any): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(URL_SERVICIOS_BANK+'/excel/delete-list',bankingTransaction, { headers: this.httpHeaders })
      .pipe(tap(() => {
        this._refreshNeeded$.next();
      }),
        catchError(err =>{
          console.error(err);
         this.alertService.error('mensaje de error enviado desde el Servidor');
          return throwError(err)
        })
      )
  }


  getBankMovByQuery(query: string): Observable<Pageable> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Pageable>(URL_SERVICIOS_BANK + '/bank/get-all-movements?' + `${query}`, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )
  }




  getBankMovById(id: number): Observable<any> {
    return this.http.get<any>(URL_SERVICIOS_BANK + '/bank/bank-movement/'+`?id=${id}`, { headers: this.httpHeaders })
  }



}
