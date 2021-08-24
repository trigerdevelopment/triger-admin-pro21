import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';
import { JwtDTO } from 'src/app/models/jwt-dto';
import { URL_SERVICIOS } from '../settings/url';
import { Observable, Subject, throwError } from 'rxjs';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../spiner.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  httpHeaders: HttpHeaders;
  private _refreshNeeded$ = new Subject<void>();

    get refreshNeeded$() {
      return this._refreshNeeded$;
    }

  private _refreshTypesComp$ = new Subject<void>();

  get refreshTypesComp$() {
    return this._refreshTypesComp$;
  }

  constructor(private http: HttpClient, private alertService: ToastrService, public spinnerService: SpinnerService,
    ) { }

  createObject(createObj: NuevoUsuario, url: string): Observable<any> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${URL_SERVICIOS}/${url}`, createObj, { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        }),   catchError(err =>{
          console.error(err);
         this.alertService.error('mensaje de error enviado desde el Servidor', `${err.error.error}`);
         this.spinnerService.hide();
          return throwError(err)
        })
      );
  }

  deleteObject(param: any, url: string): Observable<any> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${URL_SERVICIOS}/${url}/?id=${param}`,  { headers: this.httpHeaders })
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        }),
      );
  }

  createObject2(createObj: any, url: string): Observable<any> {

    this.httpHeaders = new HttpHeaders({ 'Accept': 'application/json' });
    const req = new HttpRequest('POST', `${URL_SERVICIOS}/${url}`, createObj, {
      headers: this.httpHeaders,
      //  params: formdata,
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      }))
  }

  public postObject(createObj: any, url: string): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(`${URL_SERVICIOS}/${url}`, createObj)
      .pipe(tap(() => {
        this._refreshNeeded$.next;
      }));
  }

  public updateObject(createObj: any, url: string): Observable<JwtDTO> {
    return this.http.put<JwtDTO>(`${URL_SERVICIOS}/${url}`, createObj);
  }

  public getObjectByName(username: any, url: string): Observable<NuevoUsuario> {
    return this.http.get<NuevoUsuario>(`${URL_SERVICIOS}/${url}/${username}`, { headers: this.httpHeaders })
    .pipe(
      map( resp => resp)
     // delay(3000)
       // this.refreshNeeded$.next;
   )
  }

  getAllObjects(url: string): Observable<any[]> {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<NuevoUsuario[]>(`${URL_SERVICIOS}/${url}`, { headers: this.httpHeaders });
  }

  getObjectById(id: number, url: string): Observable<any> {
    return this.http.get<any>(`${URL_SERVICIOS}/${url}/${id}`, { headers: this.httpHeaders })
  }
}
