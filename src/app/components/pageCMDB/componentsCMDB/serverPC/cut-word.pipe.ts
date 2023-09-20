import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutWord'
})
export class CutWordPipe implements PipeTransform {

  transform(value: string | undefined, limit: number, trail = '...'): string {
    if (!value) {
      return '';
    }
    if (value.length > limit) {
      return value.substring(0, limit) + trail;
    } else {
      return value;
    }
  }

}
