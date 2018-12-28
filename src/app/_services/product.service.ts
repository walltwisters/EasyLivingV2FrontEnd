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
    return this.http.post(`${config.apiUrl}/product/create`, Product);
  }

  update() {

  }

  delete() {

  }
}