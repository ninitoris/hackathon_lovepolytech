import { NgClass } from '@angular/common';
import { literalMap } from '@angular/compiler';
import { Component, Input, OnInit, EventEmitter, ViewChild} from '@angular/core';
import {
  ViewerOptions,
  ViewerInitializedEvent,
  DocumentChangedEvent,
  SelectionChangedEventArgs,
  Extension
} from "ng2-adsk-forge-viewer";
import { backendip, backendport, HttpService } from '../../services/http.service';
import { MyExtension } from "./my-extension";
import {Token} from '../../token';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { AuthService } from '../../services/auth.service';
import { now } from 'moment';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
}) 



export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpService,
    public authService : AuthService,
    private ac: AppComponent
    ) { 

  }

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public viewerOptions: ViewerOptions;

  searchCat = '';

  ip = backendip;
  port = backendport;
  
  changeSearchCat(strFromChild: string){
    this.searchCat = strFromChild;
    //console.log('searchCat is now '+ this.searchCat)
  }
  
   emptylink = 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg';
   
  elArray: {pictureLink: string, num: number, tags?: string, description?: string, urn?: string}[]
  elArrayFilered: {pictureLink?: string, num: number, tags?: string, description?: string, urn?: string}[]


  
  public pubclasses : {num: number, description: string}[];

  //71xxxx
  public classes : {num: number, description: string, parent: number}[];

  //712xxx
  public subclasses : {num: number, description: string, parent: number}[];

  //7123xx
  public groups : {num: number, description: string, parent: number}[];

  //71234x
  public subgroups : {num: number, description: string, parent: number}[];

  //123456
  public types : {num: number, description: string, urn?: string, pictureLink?: string, parent: number}[];


  login: string;

  icon = 'star_border' || 'star'

  gridIsLoading = true;

  treeclass: {parent: number, num: number, description: string}[] = []

  DOCUMENT_URN = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDIxLTEyLTE3LTEyLTU4LTIyLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlLyVEMCVBMSVEMCVCMSVEMCVCRSVEMSU4MCVEMCVCQSVEMCVCMDEuU1RFUA'; 

  currentParent = 0;

  //tree element click event to update search box
  treeElClick(classNum: number){
    this.searchCat = classNum.toString();
    this.currentParent = classNum;
    this.updateSearchArray(this.searchCat)
    this.filterArr(classNum.toString());
  }

  substrArray: {}[] = ['0']

  //search editbox text changed event
  onSearchChange(event: any) {  
    //console.log('keyup event fired')
    let newVal = event.target.value;
    if (newVal === ""){
      this.currentParent = 0;
      console.log(this.currentParent)
    }else{
      this.currentParent = newVal;
    }
    this.filterArr(this.searchCat)
    this.updateSearchArray(this.searchCat)
  }

  onSearchInput(event: any){
    console.log('input event fired ' + event.target.value)
    if(this.searchCat == ""){
      this.currentParent = 0;
      this.filterArr(this.searchCat)
    }
    this.updateSearchArray(this.searchCat)

  }

  async filterArr(str: string){
    if (str != ""){
      this.elArrayFilered = [];
      let temparr = [];
      let arraysarray = [this.classes, this.subclasses, this.groups, this.subgroups, this.types]

      for (let arr of arraysarray){
        for (let el of arr){
          if(el.num != undefined && el.description.toLowerCase().indexOf(str.toLowerCase())>-1){
            temparr.push(el.num)
          }
        }
      }
      
      let seen: {
        [key: number]: number | string
      } = {};
  
      let len = this.types.length
      for (let el1 of temparr){
        for(var i = 0; i < len; i++){
          if(this.types[i].num.toString().startsWith(el1.toString())){
            var item = this.types[i].num
            if(seen[item] !== 1){
              seen[item] = 1;
              this.elArrayFilered.push(this.types[i])
            }

          }
        }
      }
      this.elArrayFilered.sort( (a,b)=>{
        if(a.num > b.num) return 1;
        if(a.num < b.num) return -1;
        return 0;
      })
      // console.log('elArrayFilered')
      // console.log(this.elArrayFilered)





      //filter 
      // add class nums
      for (let el of this.elArray){
        if(el.num != undefined && el.num.toString().indexOf(str) > -1){
          this.elArrayFilered.push(el)
        }
      }
      this.paginate();
    }else{
      this.elArrayFilered = this.elArray
      this.paginate();
    }
  }

  paginate(){
    this.arraylength = this.elArrayFilered.length;
    this.currentItemsToShow =  
    this.elArrayFilered.slice(
      this.pageIndex*this.pageSize, 
    this.pageIndex*this.pageSize + this.pageSize);

    //проверить, что длина отсортированного массива не меньше, чем элемент на текущей странице
    //если меньше, то сбросить страницу
    //
    //check if sorted array length is less than current element offset (page index * page size) 
    //if so then reset page index
    if (this.arraylength < this.pageSize* this.pageIndex + 1){
      this.paginator.firstPage();
    }
  }

  pageSize = 12;
  pageIndex = 0;

  //page change event for paginator
  onPageChange($event: any){
    this.pageSize = $event.pageSize
    this.pageIndex = $event.pageIndex
    this.paginate();
  }

  //array of items sorted by paginator
  currentItemsToShow: { 
    pictureLink?: string; num: number; tags?: string | undefined; description?: string | undefined; urn?: string | undefined; 
  }[];


  updateSearchArray(searchCat: string){
    this.substrArray = ['0']
    if (searchCat.length >= 2){
      let substr = ""
        for(let i = 2; i <= searchCat.length; i++){
          substr = searchCat.substring(0,i)
          this.substrArray.push(substr)
        }
    }
    console.log(this.substrArray)
  }

  HideShadowBox(){
    this.treeDisplay = "none"
    this.shadowDisplay = "none";
    this.classviewdisplay = "none";
    this.drawingDisplay = "none";
    this.forgeViewerDisplay = "block"
    document.body.style.overflow = "auto"
  }

  ShowTree(){
    this.treeDisplay = "block"
    this.ShowShadowBox();
    document.body.style.overflow = "hidden"
  }

 
  CloseTree(){
    this.HideShadowBox()
  }

 
  
  


  donwloadModel(){
    //console.log(this.emitClassNum)
    window.open(this.ip + this.port + '/files/' + this.emitClassNum + '.ipt', '_blank');
    //window.open('http://194.58.103.233:3001/files/' + this.emitClassNum + '.ipt', '_blank');
  }



  public  token: Token;

  arraylength = 0;

  public ngOnInit() {
    //console.log('Init()');
    this.authService.username$.subscribe((l)=>{
      if(l !==''){ 
        this.login = l
      }else {
        this.login = 'Войти'
      }
      // console.log(this.login)
      // console.log('getting favourites for ' + this.login)
      
    });

    this.http.getToken().subscribe((data:any) => this.token = new Token(data.access_token, data.expires_in));
    
    this.http.getClasses().subscribe((res: any) =>{
      
      res.forEach((el: any) => {
        el.parent = 0;
      });
      this.classes = res
      this.treeclass = this.treeclass.concat(res);
      // console.log(this.classes);

    });
    
    this.http.getSubClasses().subscribe((res: any) =>{
      res.forEach((el: any) => {
        el.parent = el.num.toString().substring(0, 2) * 1;
      });
      this.subclasses = res;
      this.treeclass = this.treeclass.concat(res);
      // console.log(this.subclasses);
    });

    this.http.getGroups().subscribe((res: any) =>{
      res.forEach((el: any) => {
        el.parent = el.num.toString().substring(0, 3) * 1;
      });
      this.groups = res;
      this.treeclass = this.treeclass.concat(res);
      // console.log(this.groups);
    });

    this.http.getSubGroups().subscribe((res: any) =>{
      res.forEach((el: any) => {
        el.parent = el.num.toString().substring(0, 4) * 1;
      });
      this.subgroups = res;
      this.treeclass = this.treeclass.concat(res);
      // console.log(this.subgroups);
    });

    this.http.getTypes().subscribe((res: any) =>{
      res.forEach((el: any) => {
        el.parent = el.num.toString().substring(0, 5) * 1;
      });
      this.types = res;
      this.treeclass = this.treeclass.concat(res);
      //console.log(this.types);
    });
    

    this.http.getTypes().subscribe((res: any) => {
      this.elArray = res;
      this.elArrayFilered = res;
      //console.log(this.elArray)
      this.currentItemsToShow = this.elArray.slice(0, 12);
      this.arraylength = this.elArray.length;
      this.gridIsLoading = false;
    });

    this.ac.getFavs();
    

    //forge viewer initialization
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
  }

  public selectionChanged(event: SelectionChangedEventArgs) {
    //console.log(event.dbIdArray);
  }

  treeDisplay = "none";
  classviewdisplay = "none";
  shadowDisplay = "none";
  drawingDisplay = "none";
  forgeViewerDisplay = "block";
  
  ngAfterViewInit(){
    this.treeDisplay = "none";
    this.classviewdisplay = "none";
    this.shadowDisplay = "none";
    this.drawingDisplay = "none";
    // this.forgeViewerDisplay = "block"
    //console.log('qweqeqweqw');
    
  }

  // CreateChildren(parentNum: string){
  //   let treeContainer = document.getElementById('treeContainer');
  //   treeContainer?.classList.add('childrenCreated');
  //   for (let treeEl of this.treeclass){
  //     if(parentNum == treeEl.parent.toString()){
  //       let child = document.createElement('div');
  //       treeContainer?.appendChild(child);
  //       child.style.border = '1px solid black';
  //       child.innerHTML = treeEl.classNum.toString();
  //       child.id = treeEl.classNum.toString();
  //     }
  //   }
  // }

  classSelected: string = '';

  TreeElClick(classNum: number){
    this.classSelected = classNum.toString();
  }

  ApplyTreeFilter(event: any){
    this.searchCat = event;
    this.currentParent = Number(event);
    this.CloseTree();
    this.updateSearchArray(this.searchCat)
    this.filterArr(this.searchCat)

  }
  
  //get class number from opened class model
  emitClassNum: number = 0;
  displayClassView(disp: boolean){
    if (disp){
      this.ShowClassView();
    }
  }

  ChangeClassNum(num: number){
    this.emitClassNum = num;
    
    for (let classEl of this.elArray){
      if(num == classEl.num){
        if(classEl.urn)
        this.DOCUMENT_URN = classEl.urn
      }

    }
  }

  ShowClassView() {
    this.classviewdisplay = "block"
    this.ShowShadowBox();
    this.AddToDisctiption();
    document.body.style.overflow = "hidden";

    if (this.ac.favs != null &&  this.ac.favs.find(el=> el == this.emitClassNum.toString())){
      this.icon  = 'star'
    }else {
      this.icon  = 'star_border'
    }
  }

  ShowShadowBox(){
    this.shadowDisplay = "block";
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

  //switch between 3d viewer and picture preview
  showDrawing(){
    if(this.drawingDisplay != "block"){
      this.drawingDisplay = "block";
      this.forgeViewerDisplay = "none"
    }else{
      this.drawingDisplay = "none";
      this.forgeViewerDisplay = "block"
    }
  }

  favIconClick(itemnum: any){
    
    let index = this.ac.favs != null ? this.ac.favs.indexOf(itemnum.toString()) : -1;
    if(index > -1){
      //если найдено - удалить 
      this.ac.favs.splice(index, 1)
      this.icon  = 'star_border'
    }
    else {
      //если не найдено - добавить 
      this.ac.favs.push(itemnum.toString())
      this.icon  = 'star'
    }
      //send array to db
      this.http.updatefavourites(this.login,this.ac.favs.join(',')).subscribe((res)=>{
        console.log(res)
      },err=>{
        this.router.navigate(['/login']);
        console.log(err)
      })
  }

}


// let forgeDiv = document.getElementById('mainForgeViewerDiv');

//     forgeDiv?.setAttribute('style', 'height: '+ window.innerHeight) 