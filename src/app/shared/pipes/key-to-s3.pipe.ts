import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'keyToS3',
})
export class KeyToS3Pipe implements PipeTransform {
  transform(s3Key: string): string {
    return !s3Key || s3Key === ''
      ? environment.icons.primary
      : [environment.s3.baseUrl, s3Key].join('/');
  }
}
