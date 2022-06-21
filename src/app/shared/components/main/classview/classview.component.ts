import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { backendip, backendport, HttpService } from 'src/app/shared/services/http.service';
import {
  ViewerOptions,
  ViewerInitializedEvent,
  DocumentChangedEvent,
  SelectionChangedEventArgs,
  Extension
} from "ng2-adsk-forge-viewer";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MainComponent } from '../main.component';
import { MyExtension } from "../my-extension";
import {Token} from '../../../token';
import { Subscription } from 'rxjs';
import { FavouritesComponent } from '../../profile/favourites/favourites.component';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-classview',
  templateUrl: './classview.component.html',
  styleUrls: ['./classview.component.css']
})
export class ClassviewComponent implements OnInit {

  @Input() star: string;
  @Input() displayClassView: boolean;
  @Input() emitClassNum: number;

  @Output() closeShadowbox = new EventEmitter();

  


  ip = backendip;
  port = backendport;

  constructor(
    private router: Router,
    private http: HttpService,
    private authService: AuthService,
    private favouritesComponent: FavouritesComponent,
    private ac: AppComponent
  ) { }
  elArray: {pictureLink: string, num: number, tags?: string, description?: string, urn?: string}[]
  DOCUMENT_URN = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDIxLTEyLTE3LTEyLTU4LTIyLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlLyVEMCVBMSVEMCVCMSVEMCVCRSVEMSU4MCVEMCVCQSVEMCVCMDEuU1RFUA'; 
  forgeViewerDisplay = "block";
  drawingDisplay = "none";
  classviewdisplay = "none";
  public viewerOptions: ViewerOptions;
  favs:string[] = ['']
  login = this.ac.username;
  icon = 'star_border' || 'star'
  classes = this.ac.classesArr;
  subclasses = this.ac.subclassesArr;
  groups = this.ac.groupsArr;
  subgroups = this.ac.subgroupsArr;
  types = this.ac.typesArr;
  
  token = this.favouritesComponent.token;

  ngOnInit(): void {
    
    this.icon = this.star;
    
    this.favs = this.ac.favs
    console.log(this.favs)
    
    this.http.getTypes().subscribe((res: any) =>{
      res.forEach((el: any) => {
        el.parent = el.num.toString().substring(0, 5) * 1;
      });
      this.elArray = res;
      console.log(this.emitClassNum)
      for (let classEl of this.elArray){
        if(this.emitClassNum == classEl.num){
          if(classEl.urn)
          this.DOCUMENT_URN = classEl.urn
          console.log(classEl.num)
        }
  
      }
    });

    

    this.viewerOptions = {
      initializerOptions: {
        env: "AutodeskProduction",
        getAccessToken: (
          onGetAccessToken: (token: string, expire: number) => void
        ) => {
          onGetAccessToken(this.token.access_token, this.token.expires_in);
        },
        api: "derivativeV2",
        enableMemoryManagement: true
      },
      viewerConfig: {
        extensions: ["Autodesk.DocumentBrowser"],
        theme: "bim-theme" 
      },
      onViewerScriptsLoaded: () => {
        // Register a custom extension
        // Extension.registerExtension(MyExtension.extensionName, MyExtension);
      },
      onViewerInitialized: (args: ViewerInitializedEvent) => {
        if (this.DOCUMENT_URN)
        args.viewerComponent.DocumentId = this.DOCUMENT_URN;
        //viewer.resize()
      },
      // showFirstViewable: false,
      // headlessViewer: true,
      // Set specific version number
      //version: "7.41"
    };

    this.AddToDisctiption();


  }

  HideShadowBox(){
    this.closeShadowbox.emit(true)
  }

  public selectionChanged(event: SelectionChangedEventArgs) {
    //console.log(event.dbIdArray);
  }
  favIconClick(itemnum: any){
    
    let index = this.favs != null ? this.favs.indexOf(itemnum.toString()) : -1;
    console.log(this.favs)
    console.log(itemnum)
    console.log(index)
    
    if(index > -1){
      //если найдено - удалить 
      this.favs.splice(index, 1)
      this.icon  = 'star_border'
    }
    else {
      //если не найдено - добавить 
      this.favs.push(itemnum.toString())
      this.icon  = 'star'
    }
      //send array to db
      this.authService.username$.subscribe(res=>{
        console.log(res)
        console.log(this.favs)
        this.http.updatefavourites(res,this.favs.join(',')).subscribe((res)=>{
          console.log(res)
        },err=>{
          this.router.navigate(['/login']);
          console.log(err)
        })
      })
      
  }



  classDiscription:string[] = [];

  //add class description to class view container
  async AddToDisctiption(){
    this.classDiscription = [];
    this.updateSearchArray(this.emitClassNum.toString())
    let text;
    let num = this.emitClassNum.toString().substring(0, 2)
    text = this.classes.find(el => el.num.toString() == num)?.description
    this.classDiscription[0] = num + " - " + text

    num = this.emitClassNum.toString().substring(0, 3)
    text = this.subclasses.find(el => el.num.toString() == num)?.description
    this.classDiscription[1] = num + " - " + text

    num = this.emitClassNum.toString().substring(0, 4)
    text = this.groups.find(el => el.num.toString() == num)?.description
    this.classDiscription[2] = num + " - " + text

    num = this.emitClassNum.toString().substring(0, 5)
    text = this.subgroups.find(el => el.num.toString() == num)?.description
    this.classDiscription[3] = num + " - " + text

    num = this.emitClassNum.toString().substring(0, 6)
    text = this.types.find(el => el.num.toString() == num)?.description
    this.classDiscription[4] = num + " - " + text


    // for(let cl of this.elArray){
    //   if (cl.num == this.emitClassNum){
    //     for (let i = 1; i <=  this.substrArray.length; i++){
    //       for (let arr of this.treeclass){
    //         if (arr.classNum.toString() == this.substrArray[i]){
    //           this.classDiscription[i-1] = arr.caption;
    //           break;
    //         }
    //       }
    //     }
    //   }
    // }
  }

  substrArray: {}[] = ['0']

  updateSearchArray(searchCat: string){
    this.substrArray = ['0']
    if (searchCat.length >= 2){
      let substr = ""
        for(let i = 2; i <= searchCat.length; i++){
          substr = searchCat.substring(0,i)
          this.substrArray.push(substr)
        }
    }
  }

  donwloadModel(){
    //console.log(this.emitClassNum)
    window.open(this.ip + this.port + '/files/' + this.emitClassNum + '.ipt', '_blank');
    //window.open('http://194.58.103.233:3001/files/' + this.emitClassNum + '.ipt', '_blank');
  }

  showDrawing(){
    if(this.drawingDisplay != "block"){
      this.drawingDisplay = "block";
      this.forgeViewerDisplay = "none"
    }else{
      this.drawingDisplay = "none";
      this.forgeViewerDisplay = "block"
    }
  }




}
