import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }


   getData(){
    return this.http.get('http://localhost:3000/data')
  }


  getToken(){
    
    return this.http.get('http://localhost:3000/oauth')
  }
  
}
