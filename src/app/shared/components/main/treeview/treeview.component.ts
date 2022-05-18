import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { MainComponent } from 'src/app/shared/components/main/main.component'

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements OnInit {

  constructor(
    private http: HttpService,
    public mainComponent : MainComponent
  ) { }


  

  ngOnInit(): void {
    
  }


  treeElClick(classNum: number){
    // this.searchCat = classNum.toString();
    // this.currentParent = classNum;
    // this.updateSearchArray(this.searchCat)
  }


}
