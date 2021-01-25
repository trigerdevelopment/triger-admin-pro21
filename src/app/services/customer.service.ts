import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Invoice } from '../models/customer';
import { URL_SERVICIOS } from './settings/url';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  setTruePayment = "api/invoice/setTruePaymentInvoiceById";
  setFalsePayment = "api/invoice/setFalsePaymentInvoiceById";

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }


  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }
  // HttpEvent<{}>

  sendXmlCustomerInvoice(fileXml: File): Observable<any> {
    const formdata: FormData = new FormData();
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    formdata.append('file', fileXml);
    console.log('FORM DATA ', formdata);
    const req = new HttpRequest('POST', 'http://localhost:8080/api/invoice/customer-xml-file', fileXml, {
      headers: this.httpHeaders,
      reportProgress: true,
      // responseType: 'text'
    })
    return this.http.request(req).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
    return this.http.request(req);
  }


  getAllInvoiceCustomer(): Observable<Invoice[]> {
    console.log('GET ALL ACCOUNTS TYPE');

    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    // url += '?token=' + this.token;
    return this.http.get<Invoice[]>(URL_SERVICIOS + '/api/customer/getAllInvoiceCustomer', { headers: this.httpHeaders });

  }


  setTruePaymentInvoiceById(id: number): Observable<Invoice> {
    console.log('GET ALL ACCOUNTS TYPE');

    //  this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    console.log('GET ALL ACCOUNTS TYPE');
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Invoice>(`${URL_SERVICIOS}/${this.setTruePayment}/${id}`, { headers: this.httpHeaders })
  }

  setFalsePaymentInvoiceById(id: number): Observable<Invoice> {
    console.log('GET ALL ACCOUNTS TYPE');

    //  this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    console.log('GET ALL ACCOUNTS TYPE');
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Invoice>(`${URL_SERVICIOS}/${this.setFalsePayment}/${id}`, { headers: this.httpHeaders })
  }

}
