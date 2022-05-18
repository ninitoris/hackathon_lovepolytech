import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { username } from 'src/app/app.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) { }

  isLoggedin = this.auth.isLoggedIn();

  login = 'Ожидание...';
  
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
       this.isLoggedin = this.auth.isLoggedIn();
      }
    })
    this.auth.initSession();
    this.auth.username$.subscribe(l=> this.login = l);

  }

  logout(){
    this.auth.logout();
  }
}
