import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addProductSucess, addProductToCart, clearCart, removeProductById, removeProductToCart } from 'src/app/state/cart.action';
import { ProductGroup, selectGroupedCartEntries, selectTotalPrice } from 'src/app/state/cart.selector';
import { registerLocaleData } from '@angular/common';
import { VndPipePipe } from 'src/app/pipes/vnd-pipe.pipe';
import localeFr from '@angular/common/locales/vi';
import { product } from 'src/app/model/data_type';
import { ProductServiceService } from 'src/app/services/product-service.service';
registerLocaleData(localeFr, 'vi');

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartEntries$: Observable<ProductGroup[]>
  totalPrice$: Observable<number>;
  shipping:number = 30000;
  user!:any;
  userId!:any

  constructor(private store: Store, private product:ProductServiceService){
    this.cartEntries$ = store.select(selectGroupedCartEntries);
    this.totalPrice$ = store.select(selectTotalPrice);
  }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    this.userId = this.user && JSON.parse(this.user).id;
  }

  clearEntries () {
    this.store.dispatch(clearCart(this.userId));
  }

  more(entry: product) {
    this.store.dispatch(addProductToCart({product: entry}));
  }

  less (entry: product) {
    this.store.dispatch(removeProductToCart({product: entry}));
  }

  delete(entries: product) {
    this.store.dispatch(removeProductById({product: entries}));
    console.log("DELETE CART");
  }

  clearCart() {
    this.store.dispatch(clearCart({id: this.userId}));
  }
}
