import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
declare function init_plugins() : void;

import Swal from 'sweetalert2';
import { CrudService } from '../services/shared/crud.service';
import { AuthSessionService } from '../services/auth/auth-session.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';

import * as AuthActions from '../store/actions/auth.actions';

@Component({
  selector: 'app-login-session',
  templateUrl: './login-session.component.html',
  styleUrls: ['./login-session.component.css']
})
export class LoginSessionComponent implements OnInit {

  form: FormGroup;
  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;

  constructor(private f: FormBuilder,
    private tokenService: AuthSessionService,
    private authService: CrudService,
    private router: Router,
    private store: Store<AppState>

  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      // this.roles = this.tokenService.getAuthorities();
    }

    // this.form = this.f.group({
    //   nombreUsuario: [''],
    //   password: ['']

    // });
  }

  onLogin(): void {
    console.log('ENTRAMOS AL LOGIN');

    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.store.dispatch(AuthActions.loginComponent({user: this.loginUsuario}))



    // this.authService.postObject(this.form.value, 'auth/login').subscribe(
    //   data => {
    //     this.isLogged = true;
    //     this.isLoginFail = false;

    //     this.tokenService.setToken(data.token);
    //     this.tokenService.setUserName(data.nombreUsuario);
    //     this.tokenService.setAuthorities(data.authorities);
    //     this.roles = data.authorities;
    //     // this.toastr.success('Bienvenido ' + data.nombreUsuario, 'OK', {
    //     //   timeOut: 3000, positionClass: 'toast-top-center'
    //     // });
    //     this.router.navigate(['/dashboard']);
    //   },
    //   err => {
    //     this.isLogged = false;
    //     this.isLoginFail = true;
    //     this.errMsj = err.error.message;
    //     // this.toastr.error(this.errMsj, 'Fail', {
    //     //   timeOut: 3000,  positionClass: 'toast-top-center',
    //     // });
    //      console.log(err.error.message);
    //   }
    // );
  }

}
