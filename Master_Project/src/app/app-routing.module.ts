import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdAddProductComponent } from './admin/components/ad-add-product/ad-add-product.component';
import { AdEditComponent } from './admin/components/ad-edit/ad-edit.component';
import { AdUpdateProductComponent } from './admin/components/ad-update-product/ad-update-product.component';
import { HistoryDetailComponent } from './auth/components/history-detail/history-detail.component';
import { HistoryComponent } from './auth/components/history/history.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ProfileComponent } from './auth/components/profile/profile.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './products/components/cart/cart.component';
import { ProductDetailComponent } from './products/components/product-detail/product-detail.component';
import { SearchComponent } from './products/components/search/search.component';
import { HomeComponent } from './share/component/home/home.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import("./share/share.module").then(m => m.ShareModule)
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'login',
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'shop',
    component: ShopComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'ad_add_prd',
    component: AdAddProductComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'ad_update',
    component: AdUpdateProductComponent,
    canActivate: [AdminGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'product_detail/:id',
    component: ProductDetailComponent
  },{
    path: 'product_edit/:id',
    component: AdEditComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'history_detail/:id',
    component: HistoryDetailComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
