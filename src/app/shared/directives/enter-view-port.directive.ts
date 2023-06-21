import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appTrackViewPort]',
})
export class EnterViewPortDirective implements AfterViewInit, OnDestroy {
  @Output() isAtTop: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _observer: IntersectionObserver | undefined;

  constructor(@Host() private _elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const callback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        this.isAtTop.emit(entry.isIntersecting);
      });
    };

    this._observer = new IntersectionObserver(callback, options);

    this._observer.observe(this._elementRef.nativeElement);
  }

  ngOnDestroy() {
    this._observer?.disconnect();
  }
}
