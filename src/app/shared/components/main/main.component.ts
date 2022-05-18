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
import {Token} from '../../../token';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
}) 



export class MainComponent implements OnInit {

  constructor(
    private http: HttpService,
    public authService : AuthService) { 

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
   
  elArray: {pictureLink: string, num?: number, tags?: string, description?: string, urn?: string}[]
  elArrayFilered: {pictureLink: string, num?: number, tags?: string, description?: string, urn?: string}[]


  
  public pubclasses : {num: number, description: string}[];

  //71xxxx
  classes : {num: number, description: string, parent: number}[];

  //712xxx
  subclasses : {num: number, description: string, parent: number}[];

  //7123xx
  groups : {num: number, description: string, parent: number}[];

  //71234x
  subgroups : {num: number, description: string, parent: number}[];

  //123456
  types : {num: number, description: string, urn?: string, pictureLink?: string, parent: number}[];

  favs = [123,711111,123456,711112];

  login: any;

  icon = 'star_border' || 'star'



  treeclass: {parent: number, classNum: number, caption: string}[]= [
    { parent: 0,
      classNum: 38,
      caption: "38xxxx - Двигатели (кроме электрических)"
    },
    { parent: 38,
      classNum: 382,
      caption: "382xxx - Поршневые с внешним подводом тепла, гидравлические, пневматические, роторные и роторно-поршневые, поворотные гидродвигатели"
    },
    { parent: 382,
      classNum: 3821,
      caption: "3821xx - Поршневые с внешним подводом тепла"
    },
    { parent: 3821,
      classNum: 38211,
      caption: "38211x - Стирлинг"
    },
    { parent: 38211,
      classNum: 382111,
      caption: "382111 - Одноцилиндровые с вытеснителем"
    },
    {
      parent: 0,
      classNum: 71,
      caption: "71xxxx - Детали - тела вращения типа колец, дисков, шкивов, блоков, стержней, втулок, стаканов, колонок, валов, осей, штоков, шпинделей и др."
    },
    {
      parent: 0,
      classNum: 72,
    caption: "72xxxx - Детали - тела вращения с элементами зубчатого зацепления; трубы, шланги, проволочки, разрезные, сектора, сегменты; изогнутые из листов, полос и лент; аэрогидродинамические; корпусные, опорные; емкостные; подшипников"
    },
    {
      parent: 0,
      classNum: 73,
    caption: "73хххх - Детали - не тела вращения корпусные, опорные, емкостные"
    },
    {
      parent: 0,
      classNum: 74,
    caption: "74хххх - Детали - не тела вращения плоскостные; рычажные, грузовые, тяговые; аэрогидродинамические; изогнутые из листов, полос и лент; профильные; трубы"
    },
    {
      parent: 0,
      classNum: 75,
    caption: "75хххх - Детали - тела вращения и (или) не тела вращения, кулачковые, карданные, с элементами зацепления, арматуры, санитарно-технические, разветвленные, пружинные, ручки, уплотнительные, отсчетные, пояснительные, маркировочные, защитные, посуды, оптические, электрорадиоэлектронные, крепежные"
    },
    {
      parent: 71,
      classNum: 711,
      caption: "711xxx - С L до 0,5 D вкл. с нар. поверхностью цилиндрической"
    },
    {
      parent: 71,
      classNum: 712,
      caption: "712xxx - С L до 0,5 D вкл. с нар. поверхностью конической, криволин., комбинир."
    },
    {
      parent: 71,
      classNum: 713,
      caption: "713xxx - С L от 0,5 D до 2 D вкл. с нар. поверхностью цилиндрической"
    },
    {
      parent: 71,
      classNum: 714,
      caption: "714xxx - С L от 0,5 D до 2 D вкл. с нар. поверхностью конической, криволин., комбинир."
    },
    {
      parent: 71,
      classNum: 715,
      caption: "715xxx - С L св. 2 D с нар. поверхностью цилиндрической"
    },
    {
      parent: 71,
      classNum: 716,
      caption: "716xxx - С L св. 2 D с нар. поверхностью конической, криволин., комбинир."
    },
    {
      parent: 711,
      classNum: 7111,
      caption: "7111xx - Без закр. уступов, гладкой, без наружн. резьбы"
    },
    {
      parent: 711,
      classNum: 7112,
      caption: "7112xx - Без закр. уступов, гладкой, с наружн. резьбой"
    },
    {
      parent: 711,
      classNum: 7113,
      caption: "7113xx - Без закр. уступов, ступенчатой односторонней, без нар. резьбы"
    },
    {
      parent: 711,
      classNum: 7114,
      caption: "7114xx - Без закр. уступов, ступенчатой двухсторонней, без нар. резьбы"
    },
    {
      parent: 711,
      classNum: 7115,
      caption: "7115xx - Без закр. уступов, ступенчатой, с нар. резьбой"
    },
    {
      parent: 711,
      classNum: 7116,
      caption: "7116xx - С закрытыми уступами, без наружной резьбы"
    },
    {
      parent: 711,
      classNum: 7117,
      caption: "7117xx - С закрытыми уступами, с наружной резьбой"
    },
    {
      parent: 7111,
      classNum: 71111,
      caption: "71111x - Без центр. отв."
    },
    {
      parent: 7111,
      classNum: 71112,
      caption: "71112x - С центр. глухим отв. с одной или двух сторон, без резьбы"
    },
    {
      parent: 7111,
      classNum: 71113,
      caption: "71113x - С центр. глухим отв. с одной или двух сторон, с резьбой"
    },
    {
      parent: 7111,
      classNum: 71114,
      caption: "71114x - С центр. сквоз. отв., круг. в сеч., цилиндр. без резьбы, гладким"
    },
    {
      parent: 7111,
      classNum: 71115,
      caption: "71115x - С центр. сквоз. отв., круг. в сеч., цилиндр. без резьбы, ступенчатым"
    },
    {
      parent: 7111,
      classNum: 71116,
      caption: "71116x - С центр. сквоз. отв., круг. в сеч., цилиндр. с резьбой"
    },
    {
      parent: 7111,
      classNum: 71117,
      caption: "71117x - С центр. сквоз. отв., круг. в сеч., конич., криволин., комбинир."
    },
    {
      parent: 7111,
      classNum: 71119,
      caption: "71119x - С центр. сквозным отв., некруг. в сеч."
    },
    {
      parent: 71111,
      classNum: 711111,
      caption: "711111 - Без кольц. пазов на торцах, без пазов и/или шлицев на нар. пов., без отв. вне оси дет."
    },
    {
      parent: 71111,
      classNum: 711112,
      caption: "711112 - Без кольц. пазов на торцах, без пазов и/или шлицев на нар. пов., с отв. вне оси дет."
    },
    {
      parent: 71111,
      classNum: 711113,
      caption: "711113 - Без кольц. пазов на торцах, с пазами и/или шлицами на нар. пов., без отв. вне оси дет."
    },
    {
      parent: 71111,
      classNum: 711114,
      caption: "711114 - Без кольц. пазов на торцах, с пазами и/или шлицами на нар. пов., с отв. вне оси дет."
    },
    {
      parent: 71111,
      classNum: 711115,
      caption: "711115 - С кольц. пазами на торцах, без пазов и шлицев на нар. пов., без отв. вне оси дет."
    },
    {
      parent: 71111,
      classNum: 711116,
      caption: "711116 - С кольц. пазами на торцах, без пазов и шлицев на нар. пов., с отв. вне оси дет."
    },
    {
      parent: 71111,
      classNum: 711117,
      caption: "711117 - С кольц. пазами на торцах, с пазами и/или шлицами на нар. пов., без отв. вне оси дет."
    },
    {
      parent: 71111,
      classNum: 711118,
      caption: "711118 - С кольц. пазами на торцах, с пазами и/или шлицами на нар. пов., с отв. вне оси дет."
    },
    {
      parent: 72,
      classNum: 721,
      caption: "721xxx - С элементами зубч. зацепления цилиндрические"
    },
    {
      parent: 721,
      classNum: 7211,
      caption: "7211xx - Одновенцовые с нар. прямыми зубьями с модулем до 1,0 мм вкл., с эвольвентными зубьями"
    },
    {
      parent: 7211,
      classNum: 72111,
      caption: "72111x - Колеса зубч. с нар. осн. базой (трибы) с консольным зубчатым венцом"
    },
    {
      parent: 72111,
      classNum: 721112,
      caption: "721112 - С модулем до 0,3 мм вкл."
    },
    {
      parent: 72111,
      classNum: 721114,
      caption: "721114 - С модулем св.0,3 до 0,5 мм вкл."
    },
    {
      parent: 72111,
      classNum: 721115,
      caption: "721115 - С модулем св.0,5 до 0,8 мм вкл."
    },
    {
      parent: 72111,
      classNum: 721116,
      caption: "721116 - С модулем св.0,8 мм"
    },
    {
      parent: 71112,
      classNum: 711121,
      caption: "711121 - Без кольц. пазов на торцах, без пазов и/или шлицев на нар. пов., без отв. вне оси дет."
    },
    {
      parent: 71112,
      classNum: 711122,
      caption: "711122 - Без кольц. паз. на торц., без паз. на нар. пов., с отв. вне оси дет."
    },
    {
      parent: 71112,
      classNum: 711123,
      caption: "711123 - Без кольц. пазов на торцах, с пазами и/или шлицами на нар. пов., без отв. вне оси дет."
    },
    {
      parent: 71112,
      classNum: 711124,
      caption: "711124 - Без кольц. пазов на торцах, с пазами и/или шлицами на нар. пов., с отв. вне оси дет."
    },
    {
      parent: 71112,
      classNum: 711125,
      caption: "711125 - С кольц. пазами на торцах, без пазов и шлицев на нар. пов., без отв. вне оси дет."
    },
    {
      parent: 71112,
      classNum: 711126,
      caption: "711126 - С кольц. пазами на торцах, без пазов и шлицев на нар. пов., с отв. вне оси дет."
    },
    {
      parent: 71112,
      classNum: 711127,
      caption: "711127 - С кольц. пазами на торцах, с пазами и/или шлицами на нар. пов., без отв. вне оси дет."
    },
    {
      parent: 71112,
      classNum: 711128,
      caption: "711128 - С кольц. пазами на торцах, с пазами и/или шлицами на нар. пов., с отв. вне оси дет."
    }
  ]

  //TODO сломалось добавление описания к классу
  //не работает поиск по описанию  
  AddClassDisctiption(){
    //console.log('тут')
    /*for(let classitem of this.elArray){
      console.log('и тут')
      if(classitem.num != undefined)
      {
        this.classDiscription = [];
        this.updateSearchArray(classitem.num.toString())
        for(let cl of this.elArray){
          if (cl.num == classitem.num){
            for (let i = 1; i <=  this.substrArray.length; i++){
              for (let arr of this.treeclass){
                if (arr.classNum.toString() == this.substrArray[i]){
                  this.classDiscription[i-1] = arr.caption;
                  break;
                }
              }
            }
          }
        }
      }
      classitem.description = "";
      for (let cd of this.classDiscription){
        classitem.description = classitem.description + " " + cd;
      }
      

    }
    */
    //console.log("Описание элеманта: " + this.elArray[1].description)
  }
  
  DOCUMENT_URN = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDIxLTEyLTE3LTEyLTU4LTIyLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlLyVEMCVBMSVEMCVCMSVEMCVCRSVEMSU4MCVEMCVCQSVEMCVCMDEuU1RFUA'; 

  currentParent = 0;

  //tree element click event to update search box
  treeElClick(classNum: number){
    this.searchCat = classNum.toString();
    this.currentParent = classNum;
    this.updateSearchArray(this.searchCat)
  }

  substrArray: {}[] = ['0']

  //search editbox text changed event
  onSearchChange(event: any) {  
    //console.log('keyup event fired')
    let newVal = event.target.value;
    if (newVal === ""){
      this.currentParent = 0;
    }else{
      this.currentParent = newVal;
      this.updateSearchArray(this.searchCat)
    }
    this.filterArr(this.searchCat)
  }

  onSearchInput(event: any){
    //console.log('input event fired ' + event.target.value)
    if(this.searchCat == ""){
      this.filterArr(this.searchCat)
    }
  }

  filterArr(str: string){
    if (str != ""){
      this.elArrayFilered = [];

      //filter class nums
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
    pictureLink: string; num?: number | undefined; tags?: string | undefined; description?: string | undefined; urn?: string | undefined; 
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
      this.login = l
      console.log(this.login)
      console.log('getting favourites for ' + this.login)
      this.http.getfavs(this.login).subscribe((res)=>{
      console.log(res)
    })
    });

    this.http.getToken().subscribe((data:any) => this.token = new Token(data.access_token, data.expires_in));
    
    this.http.getClasses().subscribe((res: any) =>{
      
      res.forEach((el: any) => {
        el.parent = 0;
      });
      this.classes = res
      // console.log(this.classes);

    });
    
    this.http.getSubClasses().subscribe((res: any) =>{
      res.forEach((el: any) => {
        el.parent = el.num.toString().substring(0, 2) * 1;
      });
      this.subclasses = res;
      // console.log(this.subclasses);
    });

    this.http.getGroups().subscribe((res: any) =>{
      res.forEach((el: any) => {
        el.parent = el.num.toString().substring(0, 3) * 1;
      });
      this.groups = res;
      // console.log(this.groups);
    });

    this.http.getSubGroups().subscribe((res: any) =>{
      res.forEach((el: any) => {
        el.parent = el.num.toString().substring(0, 4) * 1;
      });
      this.subgroups = res;
      // console.log(this.subgroups);
    });

    this.http.getTypes().subscribe((res: any) =>{
      res.forEach((el: any) => {
        el.parent = el.num.toString().substring(0, 5) * 1;
      });
      this.types = res;
      //console.log(this.types);
    });
    

    this.http.getTypes().subscribe((res: any) => {
      this.elArray = res;
      this.elArrayFilered = res;
      //console.log(this.elArray)
      this.currentItemsToShow = this.elArray.slice(0, 12);
      this.arraylength = this.elArray.length;

    });

    

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
        extensions: ["Autodesk.DocumentBrowser", MyExtension.extensionName],
        theme: "bim-theme" 
      },
      onViewerScriptsLoaded: () => {
        // Register a custom extension
        Extension.registerExtension(MyExtension.extensionName, MyExtension);
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
    this.AddClassDisctiption();
    
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

  ApplyTreeFilter(){
    this.searchCat = this.classSelected;
    this.currentParent = Number(this.classSelected);
    this.CloseTree();
    this.updateSearchArray(this.searchCat)
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

    if (this.favs.find(el=> el == this.emitClassNum)){
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
    let index = this.favs.indexOf(itemnum)
    if(index > -1){
      //если найдено - удалить 
      this.favs.splice(index, 1)
      this.icon  = 'star_border'
    }
    else {
      //если не найдено - добавить 
      this.favs.push(itemnum)
      this.icon  = 'star'
    }
      //send array to db
  }

}


// let forgeDiv = document.getElementById('mainForgeViewerDiv');

//     forgeDiv?.setAttribute('style', 'height: '+ window.innerHeight) 