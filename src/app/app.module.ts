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
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { AuthEffects } from './store/effects/auth.effects';
import { SpinnerEffects } from './store/effects/spinner.effects';
import { AlertEffects } from './store/effects/alert.effects';
import { RoutesEffects } from './store/effects/routes.effects';
import { ReportEffects } from './store/effects/report.effects';
import { ManufactureComponent } from './manufacture/manufacture.component';
import { ReportPurchaseEffects } from './store/effects/purchase.report.effects';
import { ExpensesEffects } from './store/effects/expenses.effects';
import { ModalExpenseTypeComponent } from './modals/modal-expense-type/modal-expense-type.component';
import { ModalBankMovExcelComponent } from './bank/modal-bank-mov-excel/modal-bank-mov-excel.component';
import { UploadFilesModalComponent } from './modals/upload-files-modal/upload-files-modal.component';



@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    LoginSessionComponent,
    SpinnerComponent,
    ManufactureComponent,
    ModalExpenseTypeComponent,
    ModalBankMovExcelComponent,
    UploadFilesModalComponent,

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
     APP_ROUTES,
    // MODULES_ROUTES,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forRoot(reducers, { metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }}),
    EffectsModule.forRoot([AuthEffects,SpinnerEffects, AlertEffects,RoutesEffects,ReportEffects,ReportPurchaseEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),


  ],
  providers: [
    AuthService,
    AuthGuard,
    ReactiveFormsModule,
    AuthRequestOptions,
    // ErrorhandlerService,
    FormUserService,
    AuthSessionService,

    // {
    //   provide: ErrorHandler,
    //   useClass: ErrorhandlerService
    // },
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
