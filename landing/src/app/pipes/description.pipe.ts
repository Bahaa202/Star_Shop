import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'description'
})
export class DescriptionPipe implements PipeTransform {

  transform(value: string, number: number) {
    return value.split(' ').slice(0, number).join(' ');
  }

}
