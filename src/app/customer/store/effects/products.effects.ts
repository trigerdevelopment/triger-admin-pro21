import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { ProductService } from "src/app/services/product.service";
import * as ProductActions from '../actions/products.actions';


@Injectable()
export class ProductsEffects {

  getInvoiceByFilter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      concatMap((action) =>
        this.productService.getProductsByQuery(action.query).pipe(
          map((pageable) => ProductActions.loadProductSuccess({ pageable: pageable })),
          // catchError((error) => of(InvoiceActions.loadInvoicesFailure({ error })))
        )
      )
    );
  });


  constructor(private actions$: Actions,
    private productService: ProductService,
    ) {}

  }
