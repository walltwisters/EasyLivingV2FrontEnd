import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
    var openingTimes = {
       times : `${t.openingAt}-${t.closingAt}`,
       open : t.open
    };
    return this.http.put(`${config.apiUrl}/store/update`, openingTimes);
  }

  

  
}