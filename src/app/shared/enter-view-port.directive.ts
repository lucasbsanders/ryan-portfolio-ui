import {
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Output,
} from '@angular/core';

@Directive({
  selector: '[enterViewPort]',
})
export class EnterViewPortDirective {

  @Output() becomesVisible: EventEmitter<void> = new EventEmitter<void>();

  private _observer: IntersectionObserver | undefined;

  constructor(@Host() private _elementRef: ElementRef) {}

  ngAfterViewInit(): void {

    const options = {
      root: null,
      rootMargin: '0px',
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
      if (entry.isIntersecting)
        this.becomesVisible.emit();
    });
  };
}
