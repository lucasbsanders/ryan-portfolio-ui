import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'urlSanitize'
})
export class UrlSanitizePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }
  
  transform(url: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
