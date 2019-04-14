import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphanumericOrder',
})
export class AlphanumericOrderPipe implements PipeTransform {
  transform(items: Array<any>, orderProp?: any): any {
    if (items.length) {
      console.log(items[0][orderProp]);
      return items.sort((a, b) => {
        if (a[orderProp] < b[orderProp]) { return -1; }
        if (a[orderProp] > b[orderProp]) { return 1; }
        if (a[orderProp] === b[orderProp]) { return 0; }
      });
    }
  }
}
