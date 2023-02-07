import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { cart, product } from 'src/app/model/data_type';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { FormsModule } from '@angular/forms';
import { addProductSucess, addProductToCart, removeProductById } from 'src/app/state/cart.action';
import {
  checkIdProductDetail,
  selectCountById,
} from 'src/app/state/cart.selector';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  slidefor = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    centerMode: false,
    asNavFor: '.slider-nav',
  };
  slidenav = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: false,
    focusOnSelect: true,
  };

  countProduct$!: Observable<number>;
  remove$!: Observable<string>;
  cartPre: cart[] = [];
  productData!: product;
  removeCart = false;
  size: string = 'S';
  quantity: number = 1;
  isQuantity: boolean = false;
  productId!: any;
  checkId: any = '';
  count!: number;
  id!: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductServiceService,
    private store: Store,
    private cart: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = this.activeRoute.snapshot.paramMap.get('id');
    this.countProduct$ = this.store.select(
      selectCountById({ id: Number(this.productId!) })
    );
    this.remove$ = this.store.select(
      checkIdProductDetail({ id: Number(this.productId!) })
    );
    this.productId &&
      this.product.GetProductByID(this.productId).subscribe((result) => {
        this.productData = result;
      });
    this.cart.getAllCart().subscribe((result) => {
      this.cartPre = result;
    });
  }

  more(entry: product) {
    this.store.dispatch(addProductToCart({product: entry}));
  }


  getValue(event: any) {
    this.size = event.target.value;
    console.log(this.size);
  }

  addToCart(quan: number, entry: product) {
    for(let i = 0; i < quan; i++) {
      this.more(entry);
    }
  }
}
