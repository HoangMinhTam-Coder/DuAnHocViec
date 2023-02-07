import { product } from '../model/data_type';
import { createReducer, on, ActionReducer, INIT, UPDATE } from '@ngrx/store';
import {
  addProductSucess,
  clearCart,
  clearCartSuccess,
  GetCartInitSuccess,
  removeProductById,
  removeProductByIdSucess,
  removeProductSucess,
} from './cart.action';
import { ProductServiceService } from '../services/product-service.service';


export interface Cart {
  products: product;
  id?: number;
  userId: string;
}


export const intialCartEntries: Cart[] = [];

export const cartReducer = createReducer(
  intialCartEntries,
  on(clearCartSuccess, (entries) => {
    return entries = [];
  }),

  on(GetCartInitSuccess, (entries, {cart}) => {
    console.log(cart);
    return entries = [...cart];
  }),

  on(addProductSucess, (entries, { product, userId }) => {
    const entriesClone: Cart[] = JSON.parse(JSON.stringify(entries));
    let cartObj: Cart = {
      products: product,
      userId: userId.toString(),
    };
    entriesClone.push(cartObj);
    return entriesClone;
  }),

  on(removeProductSucess, (entries, { product, userId }) => {
    const entriesClone: Cart[] = JSON.parse(JSON.stringify(entries));
    const found = entriesClone.find(
      (e) => e.products.id == product.id && e.userId == userId
    );
    if (found) {
      entriesClone.splice(entriesClone.indexOf(found), 1);
    }
    return entriesClone;
  }),

  on(removeProductByIdSucess, (entries, { product, userId }) => {
    let entriesClone: Cart[] = JSON.parse(JSON.stringify(entries));
    entriesClone = entriesClone.filter(
      (obj) => obj.products.id != product.id && obj.userId == userId
    );
    return entriesClone;
  })
);

export const metaReducerLocalStorage = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    if (action.type === INIT || action.type == UPDATE) {
      const storageValue = localStorage.getItem('state');
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem('state');
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem('state', JSON.stringify(nextState));
    return nextState;
  };
};
