import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as moment from "moment";
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  
  constructor(public http: HttpClient, public router: Router) { 
    const token = localStorage.getItem('AUTH_TOKEN')

    this._isLoggedIn$.next(!!token)
    
  }

  ip = 'http://localhost';
  //ip = 'http://194.58.103.233';
  port = ':3001';

  login(login: string, password: string): Observable<any>{
    return this.http.post(this.ip + this.port + "/login", {
      login, password
    })
  }

  public setSession(authResult : any) {
    //const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('AUTH_TOKEN', authResult.token);
    localStorage.setItem('expiresIn', authResult.expiresIn);


    //localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
} 

logout() {
  localStorage.removeItem("AUTH_TOKEN");
  localStorage.removeItem("expires_at");
}

public isLoggedIn() {
  let token = localStorage.getItem('AUTH_TOKEN');
  if (token){
    return true
  }else return false
  
}

getUser(): Observable<any>{
  return this.http.post(this.ip + this.port + "/get-user", {})
}

register(user: any): Observable<any>{
  return this.http.post(this.ip + this.port + "/register", {
    "login": user.username,
    "password": user.password
  })
}



}
