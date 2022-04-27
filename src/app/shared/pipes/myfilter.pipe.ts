import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter'
})
export class MyfilterPipe implements PipeTransform {

  transform(eskdclass: any[], searchCat: string): any {
    let filterCat = searchCat;
    let filteredValues: never[] = [];
    


    if((filterCat != "" )) {
      return filteredValues ? eskdclass.filter(eskdclass => (String(eskdclass.num) + " " + eskdclass.tags + " " + eskdclass.discription).toLowerCase().indexOf(filterCat.toLowerCase()) !== -1) : eskdclass;
    } else 
    {
      return eskdclass;
    };
  }

}
