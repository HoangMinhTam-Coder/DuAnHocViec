import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SearchComponent } from './components/search/search.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../share/component/home/home.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer, metaReducerLocalStorage } from '../state/cart.reducer';
import { VndPipePipe } from '../pipes/vnd-pipe.pipe';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

export const route:Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },

]

@NgModule({
  declarations: [
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    SearchComponent,
    VndPipePipe
  ],
  imports: [
    CommonModule,
    StoreModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    RouterModule.forChild(route)
  ],
  exports: [
    SearchComponent
  ]
})
export class ProductsModule { }
