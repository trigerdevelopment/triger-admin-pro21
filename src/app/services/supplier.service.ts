import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pageable } from '../models/customer';
import { URL_SERVICIOS } from './settings/url';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private _refreshNeeded$ = new Subject<void>();
  customerById = 'supplier/get-supplier-by-id';

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }


  httpHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private alertService: ToastrService) { }

    createSupplier(inv: string): Observable<any> {
      // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(`${URL_SERVICIOS}/supplier/`,inv, { headers: this.httpHeaders })
        .pipe(
          catchError(err =>{
            console.error(err);
           this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.error}`);
            return throwError(err)
          })
        )
    }

    updateSupplier(supplier: any): Observable<any> {
      // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put<any>(URL_SERVICIOS+'/supplier/update',supplier, { headers: this.httpHeaders })
        .pipe(
          catchError(err =>{
            console.error(err);
           this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.error}`);
            return throwError(err)
          })
        )
    }

  getAllSupplierByQuery(url: string): Observable<Pageable> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Pageable>(environment.baseUrl+'/supplier/suppliers-by-query?'+url, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )
  }

  getAllSupplierType(): Observable<any[]> {
    console.log('GET ALL ACCOUNTS TYPE');

    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    // url += '?token=' + this.token;
    return this.http.get<any[]>(URL_SERVICIOS + '/categories', { headers: this.httpHeaders });

  }

  getSupplierById(id: number): Observable<any> {
    return this.http.get<any>(`${URL_SERVICIOS}/${this.customerById}/${id}`, { headers: this.httpHeaders })
  }



}
