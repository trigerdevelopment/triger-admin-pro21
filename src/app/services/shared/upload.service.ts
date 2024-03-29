import { Injectable } from '@angular/core';
import {  HttpEvent, HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { URL_SERVICIOS } from '../settings/url';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private _refreshNeeded$ = new Subject<void>();
  private _refreshForInvoice = new Subject<void>();
  private _regreshSendFiles = new Subject<void>();
  private _regreshBankFiles = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  get refreshForInvoice(){
    return this._refreshForInvoice;
  }

  get refreshSendFiles(){
    return this._regreshSendFiles;
  }

  get refreshBankFiles(){
    return this._regreshBankFiles;
  }

  httpHeaders: HttpHeaders;



  constructor(private http: HttpClient) {
    console.log('CONSTRUCTOR UPLOAD SERVICE');

   }




  pushFileToStorage(file: File, url:any): Observable<HttpEvent<{}>> {
    console.log('file', file);
    const formdata: FormData = new FormData();
    this.httpHeaders = new HttpHeaders({ Accept: "application/json" });
    formdata.append("file", file);
    console.log("FORM DATA ", formdata);
    console.log('TIPO ', url);
    console.log('formdata', formdata);

    const req = new HttpRequest(
      "POST",
      `${URL_SERVICIOS}/` + url ,
      formdata,
      {
        headers: this.httpHeaders,
        reportProgress: true,
        responseType: "text"
      }
    );
    return this.http.request(req);
  }

  pushFileBankToStorage(file: File): Observable<HttpEvent<{}>> {
    console.log('file', file);
    const formdata: FormData = new FormData();
    this.httpHeaders = new HttpHeaders({ Accept: "application/json" });
    formdata.append("file", file);
    const req = new HttpRequest(
      "POST",
      `${URL_SERVICIOS}/excel/upload-bank-movements`,
      formdata,
      {
        headers: this.httpHeaders,
        reportProgress: true,
        responseType: "text"
      }
    );
    return this.http.request(req).pipe(
      tap(() => {
        this.refreshBankFiles.next()
      })
    );
  }


  sendXmlInvoice(file: File, url:string): Observable<any> {

    const formdata: FormData = new FormData();
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/xml'});
    formdata.append('file', file);
    console.log('FORM DATA ', formdata);

    const req = new HttpRequest('POST', `${URL_SERVICIOS}/`+ url, file,  {
      headers: this.httpHeaders,
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req).pipe(

      tap(() => {
        console.log('IS REFRESHHHEEEEDDDD?????');
           this._refreshForInvoice.next();
      } )

      )
  }

  sendBankMov(file: File): Observable<any> {

    const formdata: FormData = new FormData();
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    formdata.append('file', file);
    console.log('FORM DATA ', formdata);

    const req = new HttpRequest('POST', `${URL_SERVICIOS}/bank/upload-service`, file,  {
      headers: this.httpHeaders,
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req).pipe(

      tap(() => {
        console.log('IS REFRESHHHEEEEDDDD?????');
           this._refreshForInvoice.next();
      } )

      )
  }


  createUser(file: File, formdata:FormData): Observable<any> {
    // const formdata: FormData = new FormData();
    this.httpHeaders = new HttpHeaders({'Accept': 'application/json'});
    // formdata.append('file', file);
    // formdata.append("name", user.name);
    // formdata.append("lastName", user.lastName);
    // formdata.append("username", user.username);
    // formdata.append("password", user.password);
    // formdata.append("photoName", user.photoName);

    console.log('FORM DATA ', formdata);
    // 'http://localhost:8080/api/form'
    const req = new HttpRequest('POST',`${URL_SERVICIOS}/form`,formdata,  {
      headers: this.httpHeaders,
      //  params: formdata,
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req).pipe(
      tap(() => {
          this._refreshNeeded$.next();
      } ))
  }


  createProduct(file: File, formdata:FormData): Observable<any> {

    this.httpHeaders = new HttpHeaders({'Accept': 'application/json'});

    // 'http://localhost:8080/api/product/form'
    const req = new HttpRequest('POST',`${URL_SERVICIOS}/product/form` ,formdata,  {
      headers: this.httpHeaders,
      //  params: formdata,
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req).pipe(
      tap(() => {
          this._refreshNeeded$.next();
      } ))
  }

  updatePerfil(formdata:FormData): Observable<any> {

    this.httpHeaders = new HttpHeaders({'Accept': 'application/json'});
    // 'http://localhost:8080/api/usuarios/update-profile'

    const req = new HttpRequest('PUT',`${URL_SERVICIOS}/usuarios/update-profile`,formdata,  {
      headers: this.httpHeaders,
      //  params: formdata,
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req).pipe(
      tap(() => {
          this._refreshNeeded$.next();
      } ))
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/xml'});
    const req = new HttpRequest('POST', `${URL_SERVICIOS}/cfdi/customer-xml-file`, file, {
      headers: this.httpHeaders,
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req).pipe(
      tap(() => {
          console.log('MULTIPLE FILE LLEGADA DE DATOS');

      })
    );
  }

/* Carga el Archivo de Datos: Clientes, Proveedores, Productos etc., El nombre del Archivo: "Archivo de Admin-pro"*/

uploadDataFile(file: File): Observable<HttpEvent<{}>> {
  console.log('file', file);
  const formdata: FormData = new FormData();
  this.httpHeaders = new HttpHeaders({ Accept: "application/json" });
  formdata.append("file", file);
  const req = new HttpRequest(
    "POST",
    `${URL_SERVICIOS}/excel/upload-file`,
    formdata,
    {
      headers: this.httpHeaders,
      reportProgress: true,
      responseType: "text"
    }
  );
  return this.http.request(req).pipe(
    tap(() => {
      this.refreshBankFiles.next()
    })
  );
}

  uploadSupplierXMLFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/xml'});
    const req = new HttpRequest('POST', `${URL_SERVICIOS}/cfdi/supplier-xml-file`, file, {
      headers: this.httpHeaders,
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req).pipe(
      tap(() => {
          console.log('MULTIPLE FILE LLEGADA DE DATOS');

      })
    );
  }

  uploadCSVFile(file: File,url:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    const req = new HttpRequest('POST', `${URL_SERVICIOS}/${url}`, file, {
      headers: this.httpHeaders,
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req).pipe(
      tap(() => {
          console.log('MULTIPLE FILE LLEGADA DE DATOS');

      })
    );
  }

  getFiles(): Observable<any> {
    return this.http.get(`${URL_SERVICIOS}/files`);
  }






}
