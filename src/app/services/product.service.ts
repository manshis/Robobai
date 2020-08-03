import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Product from '../models/Product.model';
import { debounce } from 'rxjs/operators';
import { interval, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}
  baseUrl = '/api';
  productSearched: Subject<Product> = new Subject();

  getProductByName(name) {
    const url = this.baseUrl + '/product?name=' + name;
    return this.http.get<Product>(url);
  }

  searchProduct(name) {
    const url = this.baseUrl + '/search?name=' + name;
    return this.http.get<Product[]>(url, {
      responseType: 'json'
    });
  }

  addProduct(product) {
    const url = this.baseUrl + '/product';
    return this.http.post<Product>(url, product);
  }

  updateProduct(newProduct) {
    const url = this.baseUrl + '/product';
    return this.http.put<Product>(url, newProduct, {
      responseType: 'json'
    });
  }
}
