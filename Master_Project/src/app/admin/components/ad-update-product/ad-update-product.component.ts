import { Component, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { product } from 'src/app/model/data_type';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';
import { ModalComponent } from '../uilt/modal/modal.component';

@Component({
  selector: 'app-ad-update-product',
  templateUrl: './ad-update-product.component.html',
  styleUrls: ['./ad-update-product.component.css'],
})
export class AdUpdateProductComponent {
  listProduct: product[] = [];
  checkEditProduct!: product;
  isDelete: boolean = false;
  p:number = 1;

  constructor(private productStore: ProductServiceService, public dialog: MatDialog, private route: Router) {}

  ngOnInit() {
    this.productStore.GetAllProducts().subscribe((data) => {
      this.listProduct = JSON.parse(JSON.stringify(data)).ds.result;
      console.log(data);
      console.log(this.listProduct);
    });
  }

  handleEdit(id:any) {
    this.checkEditProduct = id;
    this.route.navigate([`product_edit/${id}`])
  }
  handleDelete(item:product) {
    Swal.fire({
      title: `Do you want delete ${item.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("xÓA");
        this.productStore.DeleteProduct(item.id).subscribe(() => {
           Swal.fire('Delete Success!', '', 'success')
          }
        );
      }
    })
  }
}
