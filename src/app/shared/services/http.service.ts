import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  
  ip = 'http://localhost';
  //ip = 'http://194.58.103.233';
  port = ':3001';
   getData(){
    return this.http.get(this.ip + this.port + '/data')
  }


  getToken(){
    
    return this.http.get(this.ip + this.port + '/oauth')
  }

  getClasses(){
    return this.http.get(this.ip + this.port + '/classes')
  }

  getSubClasses(){
    return this.http.get(this.ip + this.port + '/subclasses')
  }

  getGroups(){
    return this.http.get(this.ip + this.port + '/groups')
  }

  getSubGroups(){
    return this.http.get(this.ip + this.port + '/subgroups')
  }

  getTypes(){
    return this.http.get(this.ip + this.port + '/types')
  }
  
}
