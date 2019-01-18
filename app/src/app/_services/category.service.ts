import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../_models';

@Injectable()
export class CategoryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  }
  
  constructor(private http: HttpClient) { }

  get(){
        return this.http.get<Category[]>(`${config.apiUrl}/categories`);
  }
  
}