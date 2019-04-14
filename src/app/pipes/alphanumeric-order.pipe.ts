import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphanumericOrder'
})
export class AlphanumericOrderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
