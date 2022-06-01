import { UrlSanitizePipe } from './url-sanitize.pipe';

describe('UrlSanitizePipe', () => {
  it('create an instance', () => {
    const pipe = new UrlSanitizePipe();
    expect(pipe).toBeTruthy();
  });
});
