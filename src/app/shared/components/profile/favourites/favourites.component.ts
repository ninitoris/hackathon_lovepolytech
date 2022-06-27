import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { Token } from 'src/app/shared/token';
import { AddClassComponent } from '../add-class/add-class.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  public token: Token;
  treeDisplay = "none";
  classviewdisplay = "none";
  shadowDisplay = "none";
  drawingDisplay = "none";
  forgeViewerDisplay = "block";
  icon: string;
  displayEmitter = false;

  constructor(
    private http: HttpService,
    private authService: AuthService,
    private addClassComponent: AddClassComponent,
    private ac: AppComponent
  ) { }

  login: string;
  seen:number[] = []
  emitClassNum: number
  elArray:{ 
    pictureLink?: string; num: number; tags?: string | undefined; description?: string | undefined; urn?: string | undefined; 
  }[];
  itemsToShow: { 
    pictureLink?: string; num: number; tags?: string | undefined; description?: string | undefined; urn?: string | undefined; 
  }[] = [];

  

  ChangeClassNum(num: number){
    this.emitClassNum = num;
  }

  displayClassView(disp: boolean){
    if (disp){
      this.ShowClassView();
    }
  }

  ShowClassView() {
    if (this.ac.favs != null &&  this.ac.favs.find(el=> el == this.emitClassNum.toString())){
      this.icon  = 'star'
    }else {
      this.icon  = 'star_border'
    }
    this.classviewdisplay = "block"
    this.ShowShadowBox();
    this.AddToDisctiption();
    document.body.style.overflow = "hidden";

    
  }
  ShowShadowBox(){
    this.shadowDisplay = "block";
  }
  closeShadowbox(){
    this.treeDisplay = "none"
    this.shadowDisplay = "none";
    this.classviewdisplay = "none";
    this.drawingDisplay = "none";
    this.forgeViewerDisplay = "block"
    document.body.style.overflow = "auto"
  }
  AddToDisctiption() {
    //emit desc
  }

  ngOnInit(): void {
    
    this.http.getToken().subscribe(
      (data:any) => {
        this.token = new Token(data.access_token, data.expires_in)
      }
    );

    this.authService.username$.subscribe((l)=>{
        
      this.login = l
      this.http.getfavs(this.login).subscribe((res)=>{
        
        if(res[0]){
          this.ac.favs = res[0].favourite_list.split(',')

          this.http.getTypes().subscribe((res:any)=>{
            this.elArray= res;
            this.elArray.some(el=>{
              if(this.ac.favs.indexOf(el.num.toString())> -1){
                if(!this.seen[el.num]){
                  this.itemsToShow.push(el)
                  this.seen[el.num] = 1
                }
              }
            })
          })
        }
      })
    }); 
  }

  ngAfterViewInit(){
    this.treeDisplay = "none";
    this.classviewdisplay = "none";
    this.shadowDisplay = "none";
    this.drawingDisplay = "none";    
  }

  HideShadowBox(){
    
  }


}
