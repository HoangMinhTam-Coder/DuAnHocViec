import { Component } from '@angular/core';
import { order } from 'src/app/model/data_type';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  listHis!:order[]
  constructor(private order:OrderService) {}

  ngOnInit() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    this.order.getToOrder(userId).subscribe((data) => {
      this.listHis = JSON.parse(JSON.stringify(data));
      console.log(data);
    })
  }
}
