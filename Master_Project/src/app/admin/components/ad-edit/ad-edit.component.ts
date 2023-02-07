import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/model/data_type';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-edit',
  templateUrl: './ad-edit.component.html',
  styleUrls: ['./ad-edit.component.css'],
})
export class AdEditComponent {
  productId!: any;
  productEdit!: product;
  isCheck: number = 0;
  Check: boolean = false;
  obj!:product;

  editProduct: FormGroup = new FormGroup({
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

  constructor(
    private activeRoute: ActivatedRoute,
    private pro: ProductServiceService,
    public formBuilder: FormBuilder,
    private route: Router
  ) {}

  ngOnInit() {
    this.productId = this.activeRoute.snapshot.paramMap.get('id');
    this.pro.GetProductByID(this.productId).subscribe((data) => {
      this.productEdit = data;
    });

    this.editProduct = this.formBuilder.group({
      name: [''],
      image: [''],
      image1: [''],
      image2: [''],
      category: [''],
      size: [''],
      color: [''],
      price: [''],
      description: [''],
      sale: [''],
      price_sale: [''],
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
    return this.editProduct.controls;
  }

  handlerProduct(data: product) {
    let idPro = this.activeRoute.snapshot.paramMap.get('id');

    let name = data.name == '' ? this.productEdit.name : data.name;
    let price = data.price == 0 || data.price == null ? this.productEdit.price : data.price;
    let cate = data.category == '' ? this.productEdit.category : data.category;
    let color = data.color == '' ? this.productEdit.color : data.color;
    let image = data.image == '' ? this.productEdit.image : data.image;
    let image1 = data.image1 == '' ? this.productEdit.image1 : data.image1;
    let image2 = data.image2 == '' ? this.productEdit.image2 : data.image2;
    let size = data.size == '' ? this.productEdit.size : data.size;
    let sale = this.Check;
    let price_sale =
      sale == true ? data.price_sale : this.productEdit.price_sale;
    let describe =
      data.description == '' ? this.productEdit.description : data.description;

    let s = sale == true ? 1 : 0;
    let obj: product = {
      id: Number(idPro),
      name: name,
      price: price,
      category: cate,
      color: color,
      image: image,
      image1: image1,
      image2: image2,
      size: size,
      sale: s,
      price_sale: price_sale,
      description: describe,
    };

    this.pro.UpdateProduct(obj).subscribe(() => {
      Swal.fire('Edit Success!', '', 'success');
      this.route.navigate(['/ad_update'])
      this.editProduct.reset();
    });

    console.log(obj);

  }

  handlerBack() {
    this.editProduct.reset();
    this.route.navigate(['/ad_update'])
  }
}
