import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { product } from 'src/app/model/data_type';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-add-product',
  templateUrl: './ad-add-product.component.html',
  styleUrls: ['./ad-add-product.component.css']
})
export class AdAddProductComponent {
  isCheck: number = 0;
  Check: boolean = false;

  addProduct: FormGroup = new FormGroup({
    name: new FormControl(''),
    image: new FormControl(''),
    image1: new FormControl(''),
    image2: new FormControl(''),
    category: new FormControl(''),
    size: new FormControl(''),
    color: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    sale: new FormControl(''),
    price_sale: new FormControl(''),
  });


  constructor(public formBuilder: FormBuilder,private productStore: ProductServiceService) {
  }

  ngOnInit() {
    this.addProduct = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      image1: ['', [Validators.required]],
      image2: ['', [Validators.required]],
      category: ['', [Validators.required]],
      size: ['', [Validators.required]],
      color: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      description: ['', [Validators.required]],
      sale: [''],
      price_sale: ['', [ Validators.pattern('[0-9]*')]],
    });
  }

  CheckChange(event: any) {
    if (event.target.checked) {
      this.isCheck = 1;
      this.Check = true;
    } else {
      this.isCheck = 0;
      this.Check = false;
    }
  }

  get la() {
    return this.addProduct.controls;
  }

  handlerAdd(pro:product) {
    pro.sale = this.isCheck;
    pro.price_sale = this.isCheck == 1 ? pro.price_sale : pro.price;
    console.log(pro);

    this.productStore.AddProduct(pro).subscribe(() => {
      Swal.fire('Add Product Success!', '', 'success');
      this.addProduct.reset()
    })
  }
}
