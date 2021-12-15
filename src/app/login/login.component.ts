import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import Swal from 'sweetalert2'
import { CrudService } from '../services/shared/crud.service';
import { AuthSessionService } from '../services/auth/auth-session.service';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { JwtDTO } from '../models/jwt-dto';
import { SpinnerService } from '../services/spiner.service';
import { AppState } from '../store';
import * as AuthActions from '../store/actions/auth.actions';

declare function init_plugins(): void;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  // nombreUsuario: string;
  password: string;
  // roles: string[] = [];
  // errMsj: string;
  isspinner: boolean = false;
  // jwt$: Observable<string>


  constructor(private f: FormBuilder,
    private authservice: AuthService,
    public spinnerService: SpinnerService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    init_plugins();

    if (this.authservice.getJwtToken()) {

      let usuario = this.authservice.getLoggedUSer();
      Swal.fire({
        text: 'Continuas Registrado como Usuario : ' + usuario
      })
      this.router.navigate(['/dashboard']);
    }

    this.form = this.f.group({
      username: [''],
      password: ['']

    });

  }

  onSubmit() {
    console.log('ENTREMOS PUES');

    this.isspinner = true;
    this.store.dispatch(AuthActions.loginComponent({ user: this.form.value }));
    // this.store.dispatch(AuthActions.isLoading())


  }


}
