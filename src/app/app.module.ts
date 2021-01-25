import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { APP_ROUTES } from './app.routes';
import { RegisterComponent } from './login/register/register.component';
import { ServiceModule } from './services/service.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthRequestOptions } from './services/auth/auth.request';
import { ErrorhandlerService } from './services/interceptors/errorhandler.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormUserService } from './services/form-services/form-user.service';
import { UserComponent } from './user/user.component';
import {AuthSessionService} from './services/auth/auth-session.service';
import { LoginSessionComponent } from './login-session/login-session.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { JwPaginationModule } from 'jw-angular-pagination';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './spinner/spinner.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    LoginSessionComponent,
    SpinnerComponent,
 ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    JwPaginationModule,
    HttpClientModule,
    SharedModule,
    ServiceModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    BsDatepickerModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    APP_ROUTES,
    // MODULES_ROUTES,
    !environment.production ? StoreDevtoolsModule.instrument() : [],


  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthRequestOptions,
    ErrorhandlerService,
    FormUserService,
    AuthSessionService,

    {
      provide: ErrorHandler,
      useClass: ErrorhandlerService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthRequestOptions,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
