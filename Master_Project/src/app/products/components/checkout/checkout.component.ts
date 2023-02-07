import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { cart, inproduct, order, order_detail } from 'src/app/model/data_type';
import { OrderService } from 'src/app/services/order.service';
import { clearCart } from 'src/app/state/cart.action';
import { Cart } from 'src/app/state/cart.reducer';
import { ProductGroup, selectGroupedCartEntries, selectTotalPrice } from 'src/app/state/cart.selector';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent {
  cartEntries$: Observable<ProductGroup[]>
  totalPrice$: Observable<number>;
  insec: any;
  idOrder!:any;
  list:inproduct[] = [];
  id!:any;
  name!:any;
  address!:any;
  phone!:any;
  email!:any;

  checkoutForm: FormGroup = new FormGroup({
    address: new FormControl(''),
    phonenumber: new FormControl(''),
  });

  constructor(private store: Store, public formBuilder: FormBuilder, private order:OrderService, private route: Router){
    this.cartEntries$ = store.select(selectGroupedCartEntries);
    this.totalPrice$ = store.select(selectTotalPrice);

  }

  ngOnInit() {
    this.cartEntries$.subscribe(data => {
      this.insec = JSON.parse(JSON.stringify(data));
    })

    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    this.name = userData.name;
    this.address = userData.address
    this.phone = userData.sdt
    this.email = userData.email
    this.id = userData.id

    this.checkoutForm = this.formBuilder.group({
      address: [''],
      phonenumber: [''],
    });

    this.insec.forEach((item: ProductGroup) => {
      let obj:inproduct = {
        ProductId: item.cart.products.id,
        quantity: item.count
      }
      this.list.push(obj)
    })
    console.log(this.list);
  }

  get l() {
    return this.checkoutForm.controls;
  }

  handlerCheckout(data: any) {
    var obj: order = {
      userId: this.id!.toString(),
      sdt: data.phonenumber == null || data.phonenumber == '' ? this.phone : data.phonenumber,
      diaChi: data.address == null || data.address == '' ? this.address : data.address
    }
    console.log(obj);

    this.order.addToOrder(obj).subscribe((data) => {
      this.idOrder = JSON.parse(JSON.stringify(data)).id;
      localStorage.setItem("OrderId", this.idOrder);
      console.log(this.idOrder);

      this.list.forEach((item) => {
        let obi: order_detail = {
          OrderId: this.idOrder,
          IdProduct: item.ProductId,
          quantity: item.quantity
        }
        console.log(obi);
        this.order.addToOrderDetail(this.idOrder!.toString(),obi).subscribe();
      })
    });
    this.store.dispatch(clearCart({id: this.id!}));
    this.route.navigate(['/history'])
  }
}
