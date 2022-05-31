import { Component, Input, OnInit } from '@angular/core';
import { TileType, Width } from 'src/app/shared/enums.const';
import { PageEditService } from '../../services/page-edit.service';

@Component({
  selector: 'app-tile-edit',
  templateUrl: './tile-edit.component.html',
  styleUrls: ['./tile-edit.component.scss'],
})
export class TileEditComponent implements OnInit {
  @Input() tileNumber: number = 0;

  newFieldName = '';

  get Images(): any[] {
    return this.pageEdit.getImages(this.tileNumber);
  }

  get Keys(): string[] {
    const keys = Object.keys(this.Tile);
    return keys ? keys : [];
  }

  get Tile(): any {
    const tile = this.pageEdit.getTile(this.tileNumber);
    return tile ? tile : {};
  }

  get TileTypeValues(): string[] {
    return Object.values(TileType);
  }

  get WidthTypeValues(): string[] {
    return Object.values(Width);
  }

  constructor(private pageEdit: PageEditService) {}

  ngOnInit(): void {
    setTimeout(() => {
      const collection = document.getElementsByTagName('textarea');
      for (let i = 0; i < collection.length; i++) {
        this.styleTextarea(collection[i], '');
      }
    }, 300);
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
    this.pageEdit.changeTile(this.tileNumber, this.newFieldName, obj);
    this.newFieldName = '';
  }

  changeText(key: string, event: any) {
    this.pageEdit.changeTile(this.tileNumber, key, event.target.value);
  }

  changeNumber(key: string, event: any) {
    this.pageEdit.changeTile(
      this.tileNumber,
      key,
      parseInt(event.target.value)
    );
  }

  changeCheckbox(key: string, event: any) {
    this.pageEdit.changeTile(this.tileNumber, key, event.target.checked);
  }

  removeTileKey(key: string) {
    this.pageEdit.changeTile(this.tileNumber, key, null);
  }

  changeObject(key: string, event: any) {
    try {
      const tileData = JSON.parse(event.target.value);
      this.pageEdit.changeTile(this.tileNumber, key, tileData);

      this.styleTextarea(event.target, '3px solid lime');
    } catch (err) {
      this.styleTextarea(event.target, '3px solid red');
    }
  }

  styleTextarea(element: any, borderStyle: string) {
    element.style.border = borderStyle;
    element.style.height = '0px';
    element.style.height = element.scrollHeight + 5 + 'px';
  }

  addImage() {
    this.pageEdit.addImage(this.tileNumber);
  }

  moveImage(event: any) {
    const currentPos = event[0];
    const targetPos = event[1];

    const currentImg = this.pageEdit.getImage(this.tileNumber, currentPos);
    const targetImg = this.pageEdit.getImage(this.tileNumber, targetPos);

    currentImg.order = targetPos;
    targetImg.order = currentPos;

    this.pageEdit.update();
  }
}
