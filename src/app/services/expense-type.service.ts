import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { URL_SERVICIOS } from './settings/url';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeService {

  httpHeaders: HttpHeaders;

  private _refreshExpenseType$ = new Subject<void>();

  get refreshExpenseType$() {
    return this._refreshExpenseType$;
  }


  constructor(  private http: HttpClient,
    private alertService: ToastrService) { }

    getExpenseType(): Observable<any> {
      // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
      this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get<any>(URL_SERVICIOS + '/expense-type', { headers: this.httpHeaders })
        .pipe(
          tap(() => {
            // this._refreshNeeded$.next;
          })
        )
    }

  createType(inv: string): Observable<any> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(`${URL_SERVICIOS}/expense-type/create`,inv, { headers: this.httpHeaders })
        .pipe(
          tap(() => {

            this._refreshExpenseType$.next();
          }),

        )
    }

    deleteExpenseType(id:any): Observable<String> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/text' });
      return this.http.get<String>(URL_SERVICIOS + '/expense-type/delete/'+`?id=${id}`, { headers: this.httpHeaders })
        .pipe(
          tap(() => {

            this._refreshExpenseType$.next();
          }),

        )
    }

}
