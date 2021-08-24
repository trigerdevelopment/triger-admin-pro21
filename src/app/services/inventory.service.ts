import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from './settings/url';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  httpHeaders: HttpHeaders;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private http: HttpClient, private alertService: ToastrService) {}

  getRawMaterial(query: string): Observable<any> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get<any>(URL_SERVICIOS+'/wharehouse/get-raw-material-inventory'+`${query}`, { headers: this.httpHeaders })
        .pipe(
          catchError(err =>{
            console.error(err);
          console.log('ERRORRZZOTE');

            this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);

            return throwError(err)
          })
        )
    }
  getInventory(query: string): Observable<any> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get<any>(URL_SERVICIOS+'/wharehouse/get-inventory'+`${query}`, { headers: this.httpHeaders })
        .pipe(
          catchError(err =>{
            console.error(err);
          console.log('ERRORRZZOTE');

            this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);

            return throwError(err)
          })
        )
    }
}
