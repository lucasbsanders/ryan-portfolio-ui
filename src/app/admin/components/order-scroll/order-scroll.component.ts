import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-scroll',
  templateUrl: './order-scroll.component.html',
  styleUrls: ['./order-scroll.component.scss']
})
export class OrderScrollComponent implements OnInit {

  @Input() index: number = 0;
  @Input() maxIndex: number = 0;
  @Output() moveItem = new EventEmitter<number[]>();

  constructor() { }

  ngOnInit(): void {
  }

  moveTile(currentIndex: number, adjust: number) {
    var targetIndex = currentIndex + adjust;
    if (targetIndex < 0 || targetIndex >= this.maxIndex)
      targetIndex = currentIndex;
    this.moveItem.emit([currentIndex, targetIndex]);
  }

}
