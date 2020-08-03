import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, interval } from 'rxjs';
import { map, startWith, debounce, debounceTime } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import Product from '../../models/Product.model';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  searchControl = new FormControl();
  options: Product[];
  filteredOptions: Observable<string[]>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(600)).subscribe(name => {
      this.search(name);
    });
  }

  private search(name: string) {
    this.productService.searchProduct(name).subscribe(products => {
      this.options = products;
    });
  }

  onSelect(e) {
    this.productService.getProductByName(e.option.value).subscribe(product => {
      this.productService.productSearched.next(product);
    });
  }
}
