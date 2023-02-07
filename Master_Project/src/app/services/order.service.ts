import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { history_detail, order, order_detail } from '../model/data_type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private store: Store) { }

  addToOrder(order: order) {
    return this.http.post('https://localhost:7296/api/HoaDon/AddHoaDon', order)
  }

  addToOrderDetail(id:number, order: order_detail) {
    return this.http.post(`https://localhost:7296/api/ChiTietHoaDon/AddChiTietHoaDon?idhd=${id}`, order)
  }

  getToOrder(id:number) {
    return this.http.get<order>(`https://localhost:7296/api/HoaDon/GetHoaDonById?id=${id}`)
  }

  getOrderHistoryById(id: number) {
    return this.http.get<history_detail[]>(`https://localhost:7296/api/HoaDon/GetDetailOrder?id=${id}`)
  }
}
