import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-eskdclass-element',
  templateUrl: './eskdclass-element.component.html',
  styleUrls: ['./eskdclass-element.component.css']
})
export class ESKDClassElementComponent implements OnInit {

  @Input() eskdclass!: {pictureLink?: string, num: number, tags?: string, discription?: string }

  @Output() emitClassNum = new EventEmitter<number>();
  @Output() displayClassView = new EventEmitter<boolean>();
  
  openClassView(){
    this.emitClassNum.emit(this.eskdclass.num);
    this.displayClassView.emit(true);
  }
  
  constructor() { }

  ngOnInit(): void {
  }
}
