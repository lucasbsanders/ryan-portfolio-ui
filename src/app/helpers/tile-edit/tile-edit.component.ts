import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TileType, Width } from 'src/app/services/pages.const';

@Component({
  selector: 'app-tile-edit',
  templateUrl: './tile-edit.component.html',
  styleUrls: ['./tile-edit.component.scss'],
})
export class TileEditComponent {

  @Input() tile: any = {};
  @Output() changeTile = new EventEmitter<any[]>();
  @Output() removeKey = new EventEmitter<string>();

  newFieldName = '';

  get tileKeys(): string[] {
    return this.tile ? Object.keys(this.tile).sort() : [];
  }

  get tileTypesTitle(): string {
    return Object.keys(TileType).join(', ');
  }

  get widthTypesTitle(): string {
    return Object.keys(Width).join(', ');
  }

  constructor() {}

  typeOf(key: string): string {
    return typeof this.tile[key];
  }

  json(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  remove(key: string) {
    this.removeKey.emit(key);
  }

  setNewFieldName(event: any) {
    this.newFieldName = event.target.value;
  }

  addField(obj: any) {
    this.changeTile.emit([this.newFieldName, obj]);
    this.newFieldName = '';
  }

  changeCheckbox(key: string, event: any) {
    console.log('Set new value for key (checkbox):');
    console.log(key);
    console.log(event.target.checked);
    this.changeTile.emit([key, event.target.checked]);
  }

  changeText(key: string, event: any) {
    console.log('Set new value for key (text):');
    console.log(key);
    console.log(event.target.value);
    this.changeTile.emit([key, event.target.value]);
  }

  changeNumber(key: string, event: any) {
    console.log('Set new value for key (text):');
    console.log(key);
    console.log(parseInt(event.target.value));
    this.changeTile.emit([key, parseInt(event.target.value)]);
  }

  changeObject(key: string, event: any) {
    try {
      const tileData = JSON.parse(event.target.value);

      console.log('Set new value for key (object):');
      console.log(key);
      console.log(tileData);
      this.changeTile.emit([key, tileData]);

      event.target.style.border = '3px solid lime';
    } catch (err) {
      event.target.style.border = '3px solid red';
    }

    event.target.style.height = '0px';
    event.target.style.height = event.target.scrollHeight + 5 + 'px';
  }

  private setAllHeights() {
    const elements = document.getElementsByTagName('textarea');
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.height = '0px';
      elements[i].style.height = elements[i].scrollHeight + 5 + 'px';
    }
  }
}
