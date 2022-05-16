import { KeyToS3Pipe } from './key-to-s3.pipe';

describe('KeyToS3Pipe', () => {
  it('create an instance', () => {
    const pipe = new KeyToS3Pipe();
    expect(pipe).toBeTruthy();
  });
});
