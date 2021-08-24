import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Pageable } from '../models/customer';
import { URL_SERVICIOS } from './settings/url';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {
  httpHeaders: HttpHeaders;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private http: HttpClient,private alertService: ToastrService) { }

  addProduction(production: any): Observable<any> {
    this.httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    const req = new HttpRequest(
      "POST",
      "http://localhost:8080/api/manufacture/add-production",
      production,
      {
        headers: this.httpHeaders,
        reportProgress: true,
        responseType: "text"
      }
    );
    return this.http.request(req).pipe( catchError(err =>{
      console.error(err);
     this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.message}`);
      return throwError(err)
    }));
  }

  getProductionByQuery(query: string): Observable<Pageable> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Pageable>(URL_SERVICIOS+'/manufacture/production-by-query/?'+`${query}`, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )
  }

  deleteProductionById(id: any): Observable<any> {

    return this.http.delete(URL_SERVICIOS +'/manufacture/delete/'+`${id}` );
    // return this.http.delete<String>(environment.baseUrl+'/invoice/delete/'+ `${id}`, { headers: this.httpHeaders })
      // .pipe(
      //   // tap(() => {
      //   //   // this._refreshNeeded$.next;
      //   // })
      // )
  }

}
