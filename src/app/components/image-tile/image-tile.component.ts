import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DisplayItem } from '../../shared/models/DisplayItem';

@Component({
  selector: 'app-image-tile',
  templateUrl: './image-tile.component.html',
  styleUrls: ['./image-tile.component.scss']
})
export class ImageTileComponent {

  @Input() imageData: DisplayItem = <DisplayItem>{};
  @Output() itemClick = new EventEmitter<void>();

  constructor() { }

  public focusOnItem(): void {
    this.itemClick.next();
  }

}
