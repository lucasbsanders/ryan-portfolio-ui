import { HtmlsanitizePipe } from './htmlsanitize.pipe';

describe('HtmlsanitizePipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlsanitizePipe();
    expect(pipe).toBeTruthy();
  });
});
