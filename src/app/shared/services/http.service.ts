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
    return this.http.get(backendip + backendport + '/data')
  }


  getToken(){
    
    return this.http.get(backendip + backendport + '/oauth')
  }

  getClasses(){
    return this.http.get(backendip + backendport + '/classes')
  }

  getSubClasses(){
    return this.http.get(backendip + backendport + '/subclasses')
  }

  getGroups(){
    return this.http.get(backendip + backendport + '/groups')
  }

  getSubGroups(){
    return this.http.get(backendip + backendport + '/subgroups')
  }

  getTypes(){
    return this.http.get(backendip + backendport + '/types')
  }

  
  
}

//export const backendip = 'http://localhost';
export const backendip = 'http://194.58.103.233';
export const backendport = ':3001';