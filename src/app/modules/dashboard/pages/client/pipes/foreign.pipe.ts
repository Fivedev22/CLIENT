import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foreign'
})
export class ForeignPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value === true ? "Si" : "No";
  }
}
