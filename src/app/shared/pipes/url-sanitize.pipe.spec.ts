import { SecurityContext } from '@angular/core';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';
import { UrlSanitizePipe } from './url-sanitize.pipe';

describe('UrlSanitizePipe', () => {
  const domFake = {
    bypassSecurityTrustResourceUrl: ((input: string) => input),
    bypassSecurityTrustUrl: ((input: string) => input),
    bypassSecurityTrustHtml: ((input: string) => input),
    bypassSecurityTrustStyle: ((input: string) => input),
    bypassSecurityTrustScript: ((input: string) => input),
    sanitize: ((context: SecurityContext, value: string | SafeValue | null) => ''),
  };
  it('create an instance', () => {
    const pipe = new UrlSanitizePipe(domFake);
    expect(pipe).toBeTruthy();
  });
});
