import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-scroll',
  templateUrl: './order-scroll.component.html',
  styleUrls: ['./order-scroll.component.scss'],
})
export class OrderScrollComponent {
  @Input() index: number = -1;
  @Input() maxIndex: number = -1;
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';

  @Output() moveItem = new EventEmitter<number[]>();

  constructor() {}

  moveTile(currentIndex: number, adjust: number) {
    var targetIndex = currentIndex + adjust;

    if (targetIndex >= 0 && targetIndex < this.maxIndex)
      this.moveItem.emit([currentIndex, targetIndex]);
  }
}
