import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'province'
})
export class ProvincePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value === null ? "" : value.province_name;
  }

}
