import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename'
})
export class FilenamePipe implements PipeTransform {

  transform(pathName: string): string {
    return pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length);
  }

}
