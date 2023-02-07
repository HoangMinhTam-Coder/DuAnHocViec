import { Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, pluck } from 'rxjs';
import { product } from 'src/app/model/data_type';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @ViewChild('inputSearch', {static: true}) inputSearch!: ElementRef;
  products!:product[];

  constructor(private productsv: ProductServiceService) {}

  ngAfterViewInit() {
    fromEvent(this.inputSearch.nativeElement, 'keyup')
    .pipe(
      debounceTime(1000),
      pluck('target','value'),
    )
    .subscribe(res => {
      console.log('search: ', res)
      this.productsv.SearchProduct(res).subscribe(rep=>{
        this.products = rep
      })
    })
  }

  ngOnInit() {
  }
}
