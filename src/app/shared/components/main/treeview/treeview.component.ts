import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { MainComponent } from 'src/app/shared/components/main/main.component'

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent implements OnInit {

  @Output() searchCatEmitter = new EventEmitter<string>();

  constructor(
    private http: HttpService,
    public mainComponent : MainComponent
  ) { }

  searchCat = '';

  

  ngOnInit(): void {
    
  }


  treeElClick(classNum: number){
    this.searchCat = classNum.toString();
    
  }


  ApplyTreeFilter(){
    //output num
    this.searchCatEmitter.emit(this.searchCat)
  }

}
