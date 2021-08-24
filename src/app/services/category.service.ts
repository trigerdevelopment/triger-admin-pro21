import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { URL_SERVICIOS } from './settings/url';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpHeaders: HttpHeaders;

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }


  constructor(
    private http: HttpClient,
    private alertService: ToastrService) { }

  createType(inv: string): Observable<any> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(`${URL_SERVICIOS}/categories/add`,inv, { headers: this.httpHeaders })
        .pipe(
          tap(() => {
            console.log('INSIDE OF CREATE');

            this._refreshNeeded$.next();
          }),
          catchError(err =>{
            console.error(err);
           this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.error}`);
            return throwError(err)
          })
        )
    }

    deleteType(param: any): Observable<any> {
      this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get<any>(`${URL_SERVICIOS}/${'categories/delete'}/?id=${param}`,  { headers: this.httpHeaders })
        .pipe(
          tap(() => {
            this._refreshNeeded$.next();
          }),
        );
    }

    getCategories(): Observable<any[]> {
      this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get<any[]>(URL_SERVICIOS + '/categories', { headers: this.httpHeaders });

    }
    getProductCategories(): Observable<any[]> {
      this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get<any[]>(URL_SERVICIOS + '/product-categories', { headers: this.httpHeaders });

    }
}
