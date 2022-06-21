import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as moment from "moment";
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { backendip, backendport } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private _username$ = new BehaviorSubject<string>('');
  username$ = this._username$.asObservable();
  
  private _level$ = new BehaviorSubject<string>('');
  level$ = this._level$.asObservable();

  constructor(public http: HttpClient, public router: Router) { 
    const token = localStorage.getItem('AUTH_TOKEN')

    this._isLoggedIn$.next(!!token)
    
  }

  ip = backendip;
  port = backendport;

  login(login: string, password: string): Observable<any>{
    return this.http.post(this.ip + this.port + "/login", {
      login, password
    })
  }

  public setSession(authResult : any) {
    //const expiresAt = moment().add(authResult.expiresIn,'second');
    localStorage.setItem('AUTH_TOKEN', authResult.token);
    this._username$.next(authResult.user)
    this._level$.next(authResult.level)
    
    // localStorage.setItem('expiresIn', authResult.expiresIn);
    //localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  } 

  public getSession(){
    return this.username$;
  }

  public initSession(){
    if (localStorage.getItem('AUTH_TOKEN')){
      // let token = localStorage.getItem('AUTH_TOKEN');
      this.getUser().subscribe((r) =>
      {
        this._username$.next(r.login) 
        this._level$.next(r.level)

      },err =>{
        this.logout()
        this._username$.next('Войти')
      })
    }

  }

logout() {
  localStorage.removeItem("AUTH_TOKEN");
  this._username$.next('')
  this._isLoggedIn$.next(false)
  // localStorage.removeItem("expires_at");
}

public isLoggedIn() {
  return this.isLoggedIn;
  
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

public changePassword(oldPass: string, newPass: string): Observable<any>{
  return this.http.post(this.ip + this.port + "/changepassword", {
    "oldPassword": oldPass,
    "newPassword": newPass
  })
}


}
