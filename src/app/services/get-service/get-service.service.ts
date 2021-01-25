import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../settings/url';
import { delay, map, tap } from 'rxjs/operators';
import { Clientes, Customer, Invoice, Pageable } from 'src/app/models/customer';

export interface pageable {
  content:string
}

@Injectable({
  providedIn: 'root'
})
export class GetService {
  private url = 'https://reqres.in/api';

  pageable = {
    'content':''
  }
  // private _refreshNeeded$ = new Subject<void>();

  // get refreshNeeded$() {
    // return this._refreshNeeded$;
  // }

  httpHeaders: HttpHeaders;



  constructor(private http: HttpClient) { }

  getAllAccounts(url: string): Observable<Pageable> {
    console.log('GET ALL ACCOUNTS');

    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Pageable>(`${URL_SERVICIOS}/${url}`, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )

  }
  getSalesByCustomer(): Observable<Clientes[]> {
    console.log('GET ALL ACCOUNTS');

    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Clientes[]>(`${URL_SERVICIOS}/test/get-sales`, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )

  }

  connectAdminPro20(url: string): Observable<any[]> {
    console.log('GET ALL ACCOUNTS');

    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any[]>(`${URL_SERVICIOS}/${url}`, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )

  }




  getInvoicePageableByPageNo(url: string, pageSize: any, pageNo: any, sortBy: any, orderBy: boolean): Observable<Pageable> {
    console.log('GET INVOICE PAGEABLE');
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Pageable>(`${URL_SERVICIOS}${url}/?pageSize=${pageSize}&pageNo=${pageNo}&sortBy=${sortBy}&orderBy=${orderBy}`, { headers: this.httpHeaders })


  }


  getInvoiceByQuery(urlquery: string, strQuery: string, pageSize:any, pageNo:any,orderBy:any,sortBy:any): Observable<Pageable> {
    console.log('GET ALL ACCOUNTS TYPE');
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Pageable>(`${URL_SERVICIOS}${urlquery}?${strQuery}&pageSize=${pageSize}&pageNo=${pageNo}&orderBy=${orderBy}&sortBy=${sortBy}`, { headers: this.httpHeaders })
    .pipe(
      // delay(3000)
        // this.refreshNeeded$.next;
    )
  }

  getInvoiceByCurrentDate(urlquery: string, pageSize:any, pageNo:any,orderBy:any,sortBy:any): Observable<Pageable> {
    console.log('GET ALL ACCOUNTS TYPE');
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Pageable>(`${URL_SERVICIOS}${urlquery}?pageSize=${pageSize}&pageNo=${pageNo}&orderBy=${orderBy}&sortBy=${sortBy}`, { headers: this.httpHeaders })
    // .pipe(
    //   // delay(3000)
    //     // this.refreshNeeded$.next;
    // )
  }

  getInvoiceByReduxCurrentDate(urlquery: string, pageSize:any, pageNo:any,orderBy:any,sortBy:any): Observable<Invoice[]> {
    console.log('GET ALL ACCOUNTS TYPE');
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Invoice[]>(`${URL_SERVICIOS}${urlquery}?pageSize=${pageSize}&pageNo=${pageNo}&orderBy=${orderBy}&sortBy=${sortBy}`, { headers: this.httpHeaders })
    .pipe(
       map( resp => resp)
      // delay(3000)
        // this.refreshNeeded$.next;
    )
  }

  getSalesByDate(urlquery: string, strQuery: string): Observable<any> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${URL_SERVICIOS}${urlquery}?${strQuery}`, { headers: this.httpHeaders })
    .pipe(
      tap(()=>{
        // this.refreshNeeded$.next;
      })
    )
  }

  getSalesByCurrentDate(urlquery: string): Observable<any> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${URL_SERVICIOS}/${urlquery}`, { headers: this.httpHeaders })
    .pipe(
      // tap(()=>{
      //   // this.refreshNeeded$.next;
      // })
    )
  }


  getAllProducts(url: string): Observable<any[]> {
    console.log('GET ALL ACCOUNTS');

    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any[]>(URL_SERVICIOS + url, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )

  }


  getAllAdmins(url: string): Observable<any[]> {
    console.log('GET ALL ACCOUNTS');

    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any[]>(URL_SERVICIOS + url, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )

  }


  getUsers() {
    return this.http.get(`${ this.url }/users?per_page=6`)
          .pipe(
            map( resp => resp['data'])
          );
  }


}
