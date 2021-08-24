import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as ProductActions from '../actions/product.actions';
import { GetService } from 'src/app/services/get-service/get-service.service';
import { ProductService } from 'src/app/services/product.service';



@Injectable()
export class ProductEffects {

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      concatMap((action) =>
        this.productService.getProductsByQuery(action.query).pipe(
          map((products) => ProductActions.loadProductsSuccess({ data: products })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });



  constructor(private actions$: Actions,
              private productService: ProductService) {}

}
