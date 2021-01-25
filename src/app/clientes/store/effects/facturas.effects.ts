import { Injectable } from '@angular/core';
import { createEffect, ofType,Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { GetService } from 'src/app/services/get-service/get-service.service';
import { cargarInvoices, cargarInvoicesSuccess, filterBy, filterSortBy, getSalesByFilter, getSalesReportByFilter, loadInvoiceFailure } from '../actions/facturas.actions';


@Injectable()
export class FacturasEffects {
// urlquery:string = "/invoice/invoice-current-date-list";
urlquery:string = "/invoice/invoice-current-date";
pageSize:any= "10";
pageNo:any ="0";
orderBy:boolean=false;
sortBy:string = 'fecha';
// const stringQuery = `iniDate=${this.iniDate}&finalDate=${this.finalDate}&serie=${this.serie}&iniFolio=${this.iniFolio}&finalFolio=${this.finalFolio}&company=${this.company}&sucursal=${this.sucursal}&total=${this.total}&total2=${this.total2}`;

  constructor(
    private action$: Actions,
    private getService: GetService
  ) { }

  // cargarUsuario$ = createEffect(

  //   ()=> this.action$.pipe(
  //     ofType(cargarInvoices),
  //      mergeMap(
  //          ()=> this.getService.getInvoiceByCurrentDate(this.urlquery, this.pageSize, this.pageNo, this.orderBy, this.sortBy)
  //         //  ()=> this.getService.getUsers()
  //          .pipe(
  //            map((invo)=> cargarInvoicesSuccess({invoices:invo }))
  //          )
  //        )
  //       //  tap(data=> console.log('data effect ', data),

  //        ));

         getInvoiceByFilter$ = createEffect(() => {
          return this.action$.pipe(
            ofType(filterBy),
            concatMap((action) =>
              this.getService.getInvoiceByQuery(
                '/invoice/invoice-by-query',
                `iniDate=${action.filter.iniDate}&finalDate=${action.filter.finalDate}&serie=${action.filter.serie}&iniFolio=${action.filter.iniFolio}&finalFolio=${action.filter.finalFolio}&company=${action.filter.company}&sucursal=${action.filter.sucursal}&total=${action.filter.total}&total2=${action.filter.total2}`,
                action.filter.pageSize,action.filter.pageNo,action.filter.orderBy,action.filter.sortBy
                ).pipe(
                map((invoices) => cargarInvoicesSuccess({ invoices: invoices, filter:action.filter })),
                catchError((error) => of(loadInvoiceFailure({ error })))
              )
            )
          );
        });


         getSalesByFilter$ = createEffect(() => {
          return this.action$.pipe(
            ofType(getSalesByFilter),
            concatMap((action) =>
              this.getService.getSalesByDate(
                '/invoice/invoice-by-query',
                `iniDate=${action.filter.iniDate}&finalDate=${action.filter.finalDate}`)
                .pipe(
                map((invoices) => cargarInvoicesSuccess({ invoices: invoices, filter:action.filter })),
                catchError((error) => of(loadInvoiceFailure({ error })))
              )
            )
          );
        });


        // goStoreToken$ = createEffect(
        //   () =>
        //     this.actions$.pipe(
        //       ofType(AuthActions.loginSuccess),
        //       tap((jwt) =>  {
        //         this.authSession.setToken(jwt.jwt.token);
        //         this.authSession.setUserName(jwt.jwt.nombreUsuario);
        //         this.authSession.setUserDetails(jwt.jwt.usuarioDetails);
        //         this.authSession.setAuthorities(jwt.jwt.authorities);
        //       })

        //     ),
        //   { dispatch: false }
        // );
}
