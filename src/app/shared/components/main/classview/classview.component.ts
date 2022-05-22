import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-classview',
  templateUrl: './classview.component.html',
  styleUrls: ['./classview.component.css']
})
export class ClassviewComponent implements OnInit {

  constructor(
    private http: HttpService
  ) { }
  elArray: {pictureLink: string, num: number, tags?: string, description?: string, urn?: string}[]
  DOCUMENT_URN = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDIxLTEyLTE3LTEyLTU4LTIyLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlLyVEMCVBMSVEMCVCMSVEMCVCRSVEMSU4MCVEMCVCQSVEMCVCMDEuU1RFUA'; 
  emitClassNum:number;
  
  ngOnInit(): void {
    this.http.getTypes().subscribe((res: any) =>{
      res.forEach((el: any) => {
        el.parent = el.num.toString().substring(0, 5) * 1;
      });
      this.elArray = res;
      //console.log(this.types);
    });
  }

}
