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
  username: string;
  //71xxxx
  classesArr : {num: number, description: string}[];

  //712xxx
  subclassesArr : {num: number, description: string}[];

  //7123xx
  groupsArr : {num: number, description: string}[];

  //71234x
  subgroupsArr : {num: number, description: string}[];

  //123456
  typesArr : {num: number, description: string, urn?: string, pictureLink?: string}[];

  favs:string[] = ['']


  getdata(){
    this.http.getClasses().subscribe((res: any) =>{
      this.classesArr = res;
      //console.log(this.classes);
    });
    
    this.http.getSubClasses().subscribe((res: any) =>{
      this.subclassesArr = res;
      //console.log(this.subclasses);
    });

    this.http.getGroups().subscribe((res: any) =>{
      this.groupsArr = res;
      //console.log(this.groups);
    });

    this.http.getSubGroups().subscribe((res: any) =>{
      this.subgroupsArr = res;
      //console.log(this.subgroups);
    });

    this.http.getTypes().subscribe((res: any) =>{
      this.typesArr = res;
    });
  }

  
  constructor(public authService: AuthService, public router: Router, private http: HttpService) {
  }

   ngOnInit() {
    this.authService.getUser().subscribe((res)=>{
      // console.log(res)
      this.username = res.login
      this.http.getfavs(this.username).subscribe((res)=>{
        if(res[0]){
          this.favs = res[0].favourite_list.split(',')
        }
      },err=>{
        console.log(err)
        
        
      })
    },err=>{
      // console.log(err.error.message)
      this.authService.logout();
      this.username = 'Войти'
    })
     this.getdata();
  }

  


}
