import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { cart, product } from 'src/app/model/data_type';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { addProductSucess, addProductToCart } from 'src/app/state/cart.action';
import { Cart } from 'src/app/state/cart.reducer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  slideConfig = { slidesToShow: 1, slidesToScroll: 1, auto: true };
  listProduct!: product[];
  popularProduct!: product[];
  trendyProduct!: product[];

  constructor(
    private product: ProductServiceService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getLimitProduct();
    this.getTrenProduct();
  }

  getProducts() {
    this.product.GetLimitList().subscribe((data) => {
      this.listProduct = data;
    });
  }

  getLimitProduct() {
    this.product.popularProducts().subscribe((data) => {
      this.popularProduct = data;
    });
  }

  getTrenProduct() {
    this.product.trendyProducts().subscribe((data) => {
      this.trendyProduct = JSON.parse(JSON.stringify(data));
      console.log(this.trendyProduct);

    });
  }

  buyProduct(Product: product) {
    if (!localStorage.getItem('user')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        showCancelButton: true,
        confirmButtonText: 'Back to Login!',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    }
    if(localStorage.getItem('user')) {
      this.store.dispatch(addProductToCart({product: Product}));
    }
  }
}
