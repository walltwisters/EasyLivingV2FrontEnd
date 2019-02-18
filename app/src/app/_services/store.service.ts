import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '../_models/store';


@Injectable()
export class StoreService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  }
  
  constructor(private http: HttpClient) { }

  

  update(t: any) {
    const page = t.page === "homepage" ? 1 : t.page === "contactpage" ? 2 : 0;
    if(page){
      var store = {
        page,
        info : t.info
     };
    }
   
    return this.http.put(`${config.apiUrl}/store/update`, store);
  }

  get() {
    return this.http.get<Store>(`${config.apiUrl}/store`);
  }

  

  
}