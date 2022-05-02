import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public authService : AuthService, public router: Router) { }


  user: string;

  ngOnInit(): void {
    this.getProfileInfo()
    
  }

  async getProfileInfo(){ 
    this.authService.getUser().subscribe((r) =>
    {
      this.user = r.login;
      console.log('got user ' + this.user)

    },err =>{
      if (err.status == 401){
        this.authService.logout()
        this.router.navigateByUrl("/login")
      }
    })
  }
}
