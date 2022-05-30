import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TileType, Width } from 'src/app/shared/enums.const';

@Component({
  selector: 'app-tile-edit',
  templateUrl: './tile-edit.component.html',
  styleUrls: ['./tile-edit.component.scss'],
})
export class TileEditComponent {

  @Input() tile: any = {};

  @Output() changeTile = new EventEmitter<any[]>();
  @Output() changeImage = new EventEmitter<any[]>();
  @Output() removeKey = new EventEmitter<string>();

  newFieldName = '';

  Array = Array;

  get Images(): any[] {
    return this.tile && this.tile.images ?
      this.tile.images.sort((a: any, b: any) => a.order - b.order) : [];
  }

  get tileTypes(): string[] {
    return Object.keys(TileType);
  }

  get widthTypes(): string[] {
    return Object.keys(Width);
  }

  constructor() {}

  parseKeys(obj: any): string[] {
    return obj
      ? Object.keys(obj).sort((a: string, b: string) =>
          b.localeCompare(a)
        )
      : [];
  }

  typeOf(obj: any): string {
    return typeof obj;
  }

  json(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  setNewFieldName(event: any) {
    this.newFieldName = event.target.value;
  }

  addField(obj: any) {
    this.changeTile.emit([this.newFieldName, obj]);
    this.newFieldName = '';
  }

  changeText(key: string, event: any) {
    this.changeTile.emit([key, event.target.value]);
  }

  changeNumber(key: string, event: any) {
    this.changeTile.emit([key, parseInt(event.target.value)]);
  }

  changeCheckbox(key: string, event: any) {
    this.changeTile.emit([key, event.target.checked]);
  }

  removeTileKey(key: string) {
    this.removeKey.emit(key);
  }

  changeObject(key: string, event: any) {
    try {
      const tileData = JSON.parse(event.target.value);
      this.changeTile.emit([key, tileData]);

      this.styleTextarea(event.target, '3px solid lime');
    } catch (err) {
      this.styleTextarea(event.target, '3px solid red');
    }
  }

  private styleTextarea(element: any, borderStyle: string) {
    element.style.border = borderStyle;
    element.style.height = '0px';
    element.style.height = element.scrollHeight + 5 + 'px';
  }

  changeImg(event: any) {
    this.changeImage.emit(event);
  }

  moveImage($event: any) {
    const currentImg = this.tile.images[$event[0]];
    const targetImg = this.tile.images[$event[1]];
    currentImg.order = $event[1];
    targetImg.order = $event[0];
  }

}
