import { cart, product } from '../model/data_type';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Cart } from './cart.reducer';

export interface ProductGroup {
  cart: Cart;
  count: number;
}


export const selectCountProducts = createSelector(
  createFeatureSelector('cartEntries'),
  (state: product[]) => {
    return state.length;
  }
);

export const checkId  = createSelector(
  createFeatureSelector('cartEntries'),
  (state:Cart[]) => {
    const entriesClone: Cart[] = JSON.parse(JSON.stringify(state));
    const lastItem =  entriesClone[entriesClone.length - 1].id;
    return lastItem;
  }
)


export const selectTotalPrice = createSelector(
  createFeatureSelector('cartEntries'),
  (state: Cart[]) => {
    let totalPrice = 0;
    state.forEach(p => {
      if(p.products.sale == true) {
        totalPrice  = totalPrice + p.products.price_sale;
      } else {
        totalPrice  = totalPrice + p.products.price;
      }
    });
    return totalPrice;
  }
)

export const selectCountById = (props: {id: number}) => createSelector(
  createFeatureSelector('cartEntries'),
  (state: product[]) => {
    var count = 0;
    state.forEach(item => {
      if(item.id === props.id) {
        count = count + 1;
      }
    });
    return count;
  }
)

export const checkIdProductDetail = (props: {id: number}) => createSelector(
  createFeatureSelector('cartEntries'),
  (state: product[]) => {
    var string = '';
    state.forEach(item => {
      if(item.id === props.id) {
        string =  'true'
      } else {
        string =  'false'
      }
    });
    return string
  }
)

export const selectGroupedCartEntries = createSelector(
  createFeatureSelector('cartEntries'),
  (state: Cart[]) => {
    var map: Map<number, ProductGroup> = new Map;

    state.forEach(p => {
      if (map.get(p.products.id)) {
        (map.get(p.products.id) as unknown as ProductGroup).count++;
      } else {
        map.set(p.products.id, { cart: p, count: 1 });
      }
    })

    const sortedMap = new Map([...map.entries()].sort());
    return Array.from(sortedMap.values());
  }
)
