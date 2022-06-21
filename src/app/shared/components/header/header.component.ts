import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HeaderLoginService } from '../../services/header-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router, private hls: HeaderLoginService) { }

  isLoggedin = false;

  login = ''

  
  
  ngOnInit(): void {
    this.auth.username$.subscribe(res=>{
      if(res != '' && res!='Войти'){
        this.login = res
        this.isLoggedin = true
      }else{
        this.isLoggedin = false
      }
    })
    
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
      //   this.auth.isLoggedIn$.subscribe((res)=>{
      //     console.log(res)
      //     this.isLoggedin = res;
      //  })
      }
    })

    this.auth.initSession();
    // if(this.login != '' && this.login!= 'Войти' && this.login!='Ожидание'){
    //   this.isLoggedin = true
    // }else
    // {
    //   this.isLoggedin = false

    // }

    
  }
  logout(){
    this.auth.logout();
  }
}
