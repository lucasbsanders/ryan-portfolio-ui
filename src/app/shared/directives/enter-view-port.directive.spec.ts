import { EnterViewPortDirective } from './enter-view-port.directive';

describe('EnterViewPortDirective', () => {
  it('should create an instance', () => {
    const directive = new EnterViewPortDirective({nativeElement: <HTMLElement>{}});
    expect(directive).toBeTruthy();
  });
});
