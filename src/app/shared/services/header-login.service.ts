import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderLoginService {

  constructor() { }
  
  login = new BehaviorSubject('Ожидание');
  isLoggedIn = new BehaviorSubject(false)

  setLogin(title: any){
    this.login.next(title)
    if(title ==''){
      this.isLoggedIn.next(false)
    }else{
      this.isLoggedIn.next(true)
    }
  }
}
