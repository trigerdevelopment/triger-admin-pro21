import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { GraphService } from "src/app/services/graph.service";
import * as GraphActions from '../actions/graph.actions';
import * as InvoiceActions from '../actions/invoice.actions';


@Injectable()
export class GraphEffects {

 getBarGraph$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(GraphActions.loadGraphics),
    concatMap((action) =>
      this.graphicService.getDataSalesBarThisYear().pipe(
        map((data) => GraphActions.loadBarGraphSuccess({ barGraph: data })),
        //  catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
      )
    )
  );
});


getPieGraph$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(GraphActions.loadGraphics),
    concatMap((action) =>
      this.graphicService.getDataSalesVolumeThisYear().pipe(
        map((data) => GraphActions.loadPieGraphSuccess({ graph: data })),
        //  catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
      )
    )
  );
});

getPieGraphByDate$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(GraphActions.loadGraphByQuery),
    concatMap((action) =>
      this.graphicService.getSalesPieVolumeByDate(action.query).pipe(
        map((data) => GraphActions.loadPieGraphSuccess({ graph: data })),
        //  catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
      )
    )
  );
});

getBarGraphByDate$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(GraphActions.loadGraphByQuery),
    concatMap((action) =>
      this.graphicService.getSalesBarByDate(action.query).pipe(
        map((data) => GraphActions.loadBarGraphSuccess({barGraph : data })),
        //  catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
      )
    )
  );
});

constructor(private actions$: Actions,
  // private customerService: CustomerService,
  private graphicService: GraphService) {}


}
