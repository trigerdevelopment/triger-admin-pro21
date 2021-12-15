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
export class WharehouseService {

  httpHeaders: HttpHeaders;
  private _refreshWhareHouse$ = new Subject<void>();

  get refreshWhareHouse$() {
    return this._refreshWhareHouse$;
  }


  constructor(private http: HttpClient,private alertService: ToastrService) {}

  getWhareHouseMovByQuery(query: string): Observable<Pageable> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Pageable>(URL_SERVICIOS+'/wharehouse/movement-by-query/?'+`${query}`, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )
  }

  addWhareHouseMov(inv: any): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(environment.baseUrl+'/wharehouse/new',inv, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          this._refreshWhareHouse$.next();
        }),
      //  catchError(err =>{
      //    console.error(err);
      //    console.log('ERRORZZOTE ',err);

      //   // this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);
      //   this.alertService.error('mensaje de error enviado desde el Servidor',`${err.error.message}`);
      //    return throwError(err)
      //  })
      );
  }


}
