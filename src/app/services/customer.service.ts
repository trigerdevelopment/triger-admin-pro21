import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Customer, Invoice, Pageable } from '../models/customer';
import { URL_SERVICIOS } from './settings/url';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  setTruePayment = "api/invoice/setTruePaymentInvoiceById";
  setFalsePayment = "api/invoice/setFalsePaymentInvoiceById";
  customerById = 'customer/get-customer-by-id';


  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    console.log('REFRECHHHHEDDDD');

    return this._refreshNeeded$;
  }


  httpHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private alertService: ToastrService) { }
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

  // createCustomer(customer: any): Observable<any> {
  //   this.httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
  //   const req = new HttpRequest(
  //     "POST",
  //     "http://localhost:8080/api/customer/add",
  //     customer,

  //   );
  //   return this.http.request(req);
  // }

  createCustomer(inv: string): Observable<Customer> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Customer>(`${URL_SERVICIOS}/customer/`,inv, { headers: this.httpHeaders })
      .pipe(
        catchError(err =>{
          console.error(err);
         this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.error}`);
          return throwError(err)
        })
      )
  }

  updateCustomer(customer: any): Observable<any> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(URL_SERVICIOS+'/customer/update',customer, { headers: this.httpHeaders })
      .pipe(
        catchError(err =>{
          console.error(err);
         this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.error}`);
          return throwError(err)
        })
      )
  }

  editCustomer(inv: string): Observable<Customer> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Customer>(URL_SERVICIOS+'/customer',inv, { headers: this.httpHeaders })
      // .pipe(
      //   // tap(() => {
      //   //   // this._refreshNeeded$.next;
      //   // })
      // )
  }

  getAllInvoiceCustomer(): Observable<Invoice[]> {
    console.log('GET ALL ACCOUNTS TYPE');

    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    // url += '?token=' + this.token;
    return this.http.get<Invoice[]>(URL_SERVICIOS + '/api/customer/getAllInvoiceCustomer', { headers: this.httpHeaders });

  }

  getAllCustomerType(): Observable<any[]> {
    console.log('GET ALL ACCOUNTS TYPE');

    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    // url += '?token=' + this.token;
    return this.http.get<any[]>(URL_SERVICIOS + '/categories', { headers: this.httpHeaders });

  }

  createType(inv: string): Observable<any> {
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${URL_SERVICIOS}/categories/add`,inv, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          console.log('INSIDE OF CREATE');

          this._refreshNeeded$.next();
        }),
        // catchError(err =>{
        //   console.error(err);
        //  this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.error}`);
        //   return throwError(err)
        // })
      )
  }

  deleteType(param: any): Observable<any> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${URL_SERVICIOS}/${'customer-type/delete'}/?id=${param}`,  { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        }),
      );
  }


  getAllCustomer(): Observable<Customer[]> {
    console.log('GET ALL ACCOUNTS TYPE');

    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    // url += '?token=' + this.token;
    return this.http.get<Customer[]>(URL_SERVICIOS + '/customer/get-all-customer', { headers: this.httpHeaders });

  }

  getAllCustomerByQuery(url: string): Observable<Pageable> {
    // this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Pageable>(environment.baseUrl+'/customer/customer-by-query?'+url, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          // this._refreshNeeded$.next;
        })
      )
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

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${URL_SERVICIOS}/${this.customerById}/${id}`, { headers: this.httpHeaders })
  }

}
