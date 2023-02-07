import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { StoreModule } from '@ngrx/store';
import { cartReducer, metaReducerLocalStorage } from '../state/cart.reducer';

export const route:Routes = [
  {
    path: '',
    component: HomeComponent
  },
]

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    StoreModule,
    RouterModule.forChild(route),
    SlickCarouselModule
  ],
  exports: [HeaderComponent, FooterComponent, HomeComponent]
})
export class ShareModule { }
