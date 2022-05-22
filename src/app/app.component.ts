import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './shared/services/http.service';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'projectVKR';
  
  constructor(public authService: AuthService, public router: Router) {
  }

   ngOnInit() {
    this.authService.getUser().subscribe((res)=>{
      // console.log(res)
      username = res.login
    },err=>{
      // console.log(err.error.message)
      this.authService.logout();
      username = 'Войти'
    })
     
  }
}

export let username: string;