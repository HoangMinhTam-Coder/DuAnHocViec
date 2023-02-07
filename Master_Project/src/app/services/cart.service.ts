import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cart } from '../model/data_type';
import { checkId, selectTotalPrice } from '../state/cart.selector';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  id$!: Observable<number>;
  constructor(private http: HttpClient, private store: Store) {
  }

  getAllCart() {
    return this.http.get<cart[]>('http://localhost:3000/cart');
  }

  removeToCart(id: number) {
    let k;
    let userStore = localStorage.getItem('user');
    let userData = Number(userStore && JSON.parse(userStore).id);
    console.log('ID: DELETE' + k);
    return this.http.delete(`http://localhost:3000/cart/${k}`);
  }

  removeProductById(id:number) {
    return this.http.delete(`http://localhost:3000/cart/${id}`);
  }

  deleteCart(userId:number) {
    return this.http.delete(`http://localhost:3000/cart/${userId}`);
  }

  getCartByUserId(id: number) {
    return this.http.get(`https://localhost:7296/api/Cart/GetInitCart?id=${id}`);
  }

  clearCartByUserId(id: number) {
    return this.http.delete(`https://localhost:7296/api/Cart/DelCartByUserId?ui=${id}`);
  }
}
