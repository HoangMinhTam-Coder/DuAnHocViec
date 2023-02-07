import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cart, product } from '../model/data_type';
import { checkId } from '../state/cart.selector';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  cartData = new EventEmitter<cart[] | []>();
  id$!: Observable<number>;
  constructor(private http: HttpClient,  private store: Store) {}

  // Lấy data giới hạn 8 phần tử hiển thị lên page home
  GetLimitList() {
    return this.http.get<product[]>(
      'https://localhost:7296/api/Product/GetProductLimit'
    );
  }

  // Lấy tất cả sản phầm
  GetAllProducts() {
    return this.http.get<product[]>(
      'https://localhost:7296/api/Product/GetProduct'
    );
  }

  // Lấy sản phầm thông qua id
  GetProductByID(id: string) {
    return this.http.get<product>(`https://localhost:7296/api/Product/GetProductById?id=${id}`);
  }

  // Thêm sp
  AddProduct(data: product) {
    return this.http.post('https://localhost:7296/api/Product/AddProduct', data);
  }

  // Xóa Sp
  DeleteProduct(id: number) {
    return this.http.delete(`https://localhost:7296/api/Product/${id}`);
  }

  UpDateProduct(id: number, product: product) {
    return this.http.put<product>(`https://localhost:7296/api/User?id=${id}`, product);
  }

  // Cập nhật sp
  UpdateProduct(product: product) {
    return this.http.put<product>(
      `https://localhost:7296/api/Product/PutProduct?id=${product.id}`,
      product
    );
  }

  // Lấy cart list của người dùng khi đăng nhập
  getCartList(userId: number) {
    return this.http
      .get(`https://localhost:7296/api/Cart/GetInitCart?id=${userId}`);
  }

  localAddToCart(data: cart) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  popularProducts() {
    return this.http.get<product[]>('https://localhost:7296/api/Product/GetProductPops');
  }

  trendyProducts() {
    return this.http.get<product[]>('https://localhost:7296/api/Product/GetProductTren');
  }


  addToCart(carts: cart) {
    console.log(carts.userId);
    return this.http.post('https://localhost:7296/api/Cart/AddCart', carts);
  }

  removeToCart(cart: cart) {
    return this.http.delete(`https://localhost:7296/api/Cart/DeleteCartByProUserId?ui=${cart.userId}&pi=${cart.productId}`)
  }

  removeProductCartById(cart: cart){
    return this.http.delete(`https://localhost:7296/api/Cart/DelAllId?ui=${cart.userId}&pi=${cart.productId}`)
  }

  clearToCart(ui: number) {
    return this.http.delete(`https://localhost:7296/api/Cart/DelCartByUserId?ui=${ui}`)
  }

  SortProduct(sortBy: string) {
    return this.http.get<product[]>(`https://localhost:7296/api/Product/SortByPrice?sortBy=${sortBy}`)
  }

  FilterColorProduct(query: string) {
    return this.http.get<product[]>(`https://localhost:7296/api/Product/FilterColor?color=${query}`)
  }

  FillerCategoryProduct(query: string) {
    return this.http.get<product[]>(`https://localhost:7296/api/Product/FilterCategory?catergory=${query}`)
  }

  SearchProduct(query: any) {
    return this.http.get<product[]>(`https://localhost:7296/api/Product/SearchProduct?query=${query}`)
  }
}

