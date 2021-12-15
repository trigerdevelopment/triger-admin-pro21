import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pageable } from '../models/customer';
import { Product } from '../models/products';
import { URL_SERVICIOS } from './settings/url';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  // getAllProducts(queryParams:string): Observable<Pageable> {
  //   console.log('GET ALL ACCOUNTS TYPE');

  //   this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   // url += '?token=' + this.token;
  //   return this.http.get<Pageable>(URL_SERVICIOS + '/product/get-all-products', { headers: this.httpHeaders });

  // }

  getProductsByQuery(url: string): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(URL_SERVICIOS+'/product/get-products-by-query?'+url, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )
  }

  getProducts(): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(URL_SERVICIOS+'/product/get-all-products', { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )
  }
  getRawMaterialByQuery(url: string): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(URL_SERVICIOS+'/raw-material/get-raw-material-by-query?'+url, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )
  }

}
