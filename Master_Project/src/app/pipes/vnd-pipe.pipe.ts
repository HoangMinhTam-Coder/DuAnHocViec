import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vndPipe'
})
export class VndPipePipe implements PipeTransform {
  transform(value: number): string {
    return value + ' VND';
  }
}
