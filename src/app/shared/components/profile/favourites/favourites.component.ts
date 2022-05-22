import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { AddClassComponent } from '../add-class/add-class.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(
    private http: HttpService,
    private authService: AuthService,
    private addClassComponent: AddClassComponent
  ) { }

  login: string;
  favs:string[] = ['']
  seen:number[] = []
  emitClassNum:number
  elArray:{ 
    pictureLink?: string; num: number; tags?: string | undefined; description?: string | undefined; urn?: string | undefined; 
  }[];
  itemsToShow: { 
    pictureLink?: string; num: number; tags?: string | undefined; description?: string | undefined; urn?: string | undefined; 
  }[] = [];


  ChangeClassNum(num: number){
    this.emitClassNum = num;
    
    for (let classEl of this.elArray){
      if(num == classEl.num){
        if(classEl.urn){
          // this.DOCUMENT_URN = classEl.urn

        }
      }

    }
  }

  displayClassView(disp: boolean){
    if (disp){
      // this.ShowClassView();
    }
  }

  ngOnInit(): void {
    this.authService.username$.subscribe((l)=>{
      
        this.login = l
        this.http.getfavs(this.login).subscribe((res)=>{
          
          if(res[0]){
            this.favs = res[0].favourite_list.split(',')

            this.http.getTypes().subscribe((res:any)=>{
              this.elArray= res;
              this.elArray.some(el=>{
                if(this.favs.indexOf(el.num.toString())> -1){
                  if(!this.seen[el.num]){
                    this.itemsToShow.push(el)
                    this.seen[el.num] = 1
                  }
                }
              })
              console.log(this.itemsToShow)
            })



            
          }
        })
      
    });

    
  }

}
