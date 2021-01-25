import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { URL_SERVICIOS } from '../settings/url';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { JwtDTO } from 'src/app/models/jwt-dto';

// import { URL_SERVICIOS } from './url/url';

// import { config } from './../../config';
//import { Tokens } from '../models/tokens';

// import { TOKEN_NAME } from '../../guard/usuario.service';
export class Tokens {
  jwt: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly ROLE_ADMIN = 'ROLE_ADMIN';
  private readonly ROLE_USER = 'ROLE_USER';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient,
             ) {}
   httpHeaders: HttpHeaders;

  login(user: { nombreUsuario: any, password: string }): Observable<boolean>
  // login( nombreUsuario: any, password: string ): Observable<boolean>

  {
    console.log('LOGIN');

    return this.http.post<any>(`${URL_SERVICIOS}/auth/login`, user)
      .pipe(
        tap(token => {
          console.log('TOKEN ', token);
          this.doLoginUser(token.nombreUsuario, token);
        }),
        // mapTo(true),
        // catchError(error => {
        //   return of(false);
        // })
        );
  }

  // loginUser(user: LoginUsuario): Observable<NuevoUsuario> {
  //   console.log('USUARIO ', user);

  //   this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<NuevoUsuario>(`${URL_SERVICIOS}/auth/login`, user, { headers: this.httpHeaders })
  //     .pipe(
  //     //   tap(() => {
  //     //     this._refreshNeeded$.next();
  //     //   })
  //     );
  // }

  public postObject(createObj: any): Observable<JwtDTO> {
    console.log('USUARIO ',createObj);

    return this.http.post<JwtDTO>(`${URL_SERVICIOS}/auth/login`, createObj)
      .pipe(
      //   tap(() => {
      //   this._refreshNeeded$.next;
      // })
      );
  }

  logout() {
    return this.http.post<any>(`${URL_SERVICIOS}/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  //  return true;  //for testing porpouse only
  }

  refreshToken() {
    return this.http.post<any>(`${URL_SERVICIOS}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: any, token:any) {
    console.log('DO LOGIN USER', username, 'TOKEN ', token);
    this.loggedUser = username;
    console.log('USER AUTH ', token.authorities);
    this.doLogoutUser();
    this.storeAuthorities(token.authorities);
    localStorage.setItem('loggedUser', username)
    this.storeTokens(token.token);
  }

  private doLogoutUser() {
    this.loggedUser = '';
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  public getLoggedUSer() {
    return localStorage.getItem('loggedUser');
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(token:any) {
    console.log('STORE TOKEN');
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  private storeAuthorities(auth:[{authority:string}]) {
    console.log('STORE TOKEN');
    for(let i =0; i < auth.length; i++){
      if(auth[i].authority ==="ROLE_ADMIN"){
        console.log('ROLE ADMIN');

        localStorage.setItem(this.ROLE_ADMIN, auth[i].authority)
      }
      if(auth[i].authority ==="ROLE_USER"){
        console.log('ROLE USER');

        localStorage.setItem(this.ROLE_USER , auth[i].authority)
      }

    }

  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.ROLE_ADMIN);
    localStorage.removeItem(this.ROLE_USER);
  }

  public getAutorieties(){
    return localStorage.getItem(this.ROLE_ADMIN);
  }


}
