import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  addProductSucess,
  addProductToCart,
  clearCart,
  clearCartSuccess,
  GetCartInit,
  GetCartInitSuccess,
  removeProductById,
  removeProductByIdSucess,
  removeProductSucess,
  removeProductToCart,
} from './cart.action';
import { mergeMap, map, catchError, of, EMPTY } from 'rxjs';
import { ProductServiceService } from '../services/product-service.service';
import { cart, product } from '../model/data_type';
import { CartService } from '../services/cart.service';

@Injectable()
export class CartEffect {
  user!: any;
  userId!: any;
  id_del!: any;
  constructor(
    private action$: Actions,
    private product: ProductServiceService,
    private cart: CartService
  ) {
    this.user = localStorage.getItem('user');
    this.userId = this.user && JSON.parse(this.user).id;
  }

  addCart$ = createEffect(() =>
    this.action$.pipe(
      ofType(addProductToCart),
      mergeMap((action) =>
        this.product
          .addToCart({
            userId: Number(this.userId),
            productId: action.product.id,
          })
          .pipe(
            map(() =>
              addProductSucess({ product: action.product, userId: this.userId })
            ),
            catchError(() => EMPTY)
          )
      )
    )
  );

  removeCart$ = createEffect(() =>
    this.action$.pipe(
      ofType(removeProductToCart),
      mergeMap((action) =>
        this.product
          .removeToCart({ productId: action.product.id, userId: this.userId })
          .pipe(
            map(() =>
              removeProductSucess({
                product: action.product,
                userId: this.userId,
              })
            ),
            catchError(() => EMPTY)
          )
      )
    )
  );

  removeCartById$ = createEffect(() =>
    this.action$.pipe(
      ofType(removeProductById),
      mergeMap((prop) => {
        return this.product
          .removeProductCartById({
            productId: prop.product.id,
            userId: this.userId,
          })
          .pipe(
            map(() =>
              removeProductByIdSucess({
                product: prop.product,
                userId: this.userId,
              })
            )
          );
      })
    )
  );

  clearCart$ = createEffect(() =>
    this.action$.pipe(
      ofType(clearCart),
      mergeMap((prop) => {
        return this.cart
          .clearCartByUserId(prop.id)
          .pipe(map(() => clearCartSuccess()));
      })
    )
  );

  getCartInit$ = createEffect(() =>
    this.action$.pipe(
      ofType(GetCartInit),
      mergeMap((prop) => {
        return this.cart
        .getCartByUserId(Number(prop.id))
        .pipe(
          map((carts) => GetCartInitSuccess({cart: JSON.parse(JSON.stringify(carts))})),
          catchError(() => EMPTY));
      })
    )
  )
};
