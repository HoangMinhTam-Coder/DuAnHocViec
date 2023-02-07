import { Component } from '@angular/core';
import { product } from '../model/data_type';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  listProduct!:product[];
  p:number = 1;

  constructor(private product:ProductServiceService){}

  ngOnInit() {
    this.getProduct()
  }

  getProduct(){
    this.product.GetAllProducts().subscribe(data => {
      this.listProduct = JSON.parse(JSON.stringify(data)).ds.result;
    })
  }

  SortPro(e:any){
    switch(e.target.value) {
      case 'price_asc':
        this.product.SortProduct('price_asc').subscribe((data) => {
          this.listProduct = data;
        });
        break;
      case 'price_desc':
        this.product.SortProduct('price_desc').subscribe((data) => {
          this.listProduct = data;
        });
        break;
      case 'Default':
        this.getProduct();
        break;
    }

  }

  onCheckboxChange(e:any, category:string) {
    if (e.target.checked) {
      this.product.FilterColorProduct(category).subscribe((data) => {
        this.listProduct = data;
      });
    } else {
      this.getProduct();
    }
  }

  onCheckboxCategoryChange(e:any, category:string) {
    if (e.target.checked) {
      this.product.FillerCategoryProduct(category).subscribe((data) => {
        this.listProduct = data;
      });
    } else {
      this.getProduct();
    }
  }
}
