import { isIdentifier } from '@angular/compiler';
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
  selector: '[appEnterViewPort]',
})
export class EnterViewPortDirective implements AfterViewInit, OnDestroy {

  @Output() isAtTop: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _observer: IntersectionObserver | undefined;

  constructor(@Host() private _elementRef: ElementRef) {}

  ngAfterViewInit(): void {

    const options = {
      root: null,
      rootMargin: '-70px',
      threshold: 0,
    };

    this._observer = new IntersectionObserver(this._callback, options);

    this._observer.observe(this._elementRef.nativeElement);
  }

  ngOnDestroy() {
    this._observer?.disconnect();
  }

  private _callback = (entries: any[], observer: any) => {
    entries.forEach((entry) => {
      this.isAtTop.emit(entry.isIntersecting);
    });
  };
}
