import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/product';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) { }

  get(){

  }

  show(){

  }

  create(product: Product){
    debugger;
    return this.http.post(`${config.apiUrl}/products/create`, Product);
  }

  update() {

  }

  delete() {

  }
}