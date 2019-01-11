import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../_models/product';

@Injectable()
export class ProductService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  }
  
  constructor(private http: HttpClient) { }

  get(){

  }

  show(){

  }

  create(product: any){
    debugger;
    var fm = new FormData();
    fm.append("Image", product.image);
    fm.append("Name", product.name);
    fm.append("Description", product.description);
    fm.append("Price", product.price);
    //fm.append('name', product.name);
    
    return this.http.post(`${config.apiUrl}/products/create`, fm);
  }

  update() {

  }

  delete() {

  }
}