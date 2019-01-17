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
    return this.http.get<Product[]>(`${config.apiUrl}/products/`);
  }

  show(id: Number){
    return this.http.get<Product>(`${config.apiUrl}/products/show/${id}`);
  }

  create(product: any){
    var fm = new FormData();
    fm.append("Image", product.image);
    fm.append("Name", product.name);
    fm.append("Description", product.description);
    fm.append("Price", product.price);
    fm.append("CategoryIds", product.categories);
    return this.http.post(`${config.apiUrl}/products/create`, fm);
  }

  update(product: any, id: Number, imageUrl: any) {
    var fm = this.prepareFormData(product);
    fm.append("imageUrl", imageUrl);
    return this.http.put<Product>(`${config.apiUrl}/products/update/${id}`, fm);
  }

  delete() {

  }

  private prepareFormData(product: any) {
    var fm = new FormData();
    fm.append("Image", product.image);
    fm.append("Name", product.name);
    fm.append("Description", product.description);
    fm.append("Price", product.price);
    fm.append("CategoryIds", product.categories);
    return fm;

  }

  
}