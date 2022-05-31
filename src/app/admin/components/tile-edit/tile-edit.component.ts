import { Component, Input, OnInit } from '@angular/core';
import { TileDefault } from 'src/app/shared/classes.const';
import { TileType, Width } from 'src/app/shared/enums.const';
import { PageEditService } from '../../services/page-edit.service';

@Component({
  selector: 'app-tile-edit',
  templateUrl: './tile-edit.component.html',
  styleUrls: ['./tile-edit.component.scss'],
})
export class TileEditComponent {

  @Input() tileNumber: number = -1;

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

  get TileFieldOptions(): any[] {
    return Object.entries(new TileDefault()).filter(
      (entry) => this.Keys.findIndex((key) => key === entry[0]) === -1
    );
  }

  constructor(private pageEdit: PageEditService) {}

  typeOf(obj: any): string {
    return typeof obj;
  }

  addField(key: string, obj: any) {
    this.pageEdit.changeTile(this.tileNumber, key, obj);
  }

  removeTileKey(key: string) {
    this.pageEdit.changeTile(this.tileNumber, key, null);
  }

  changeText(key: string, event: any) {
    this.pageEdit.changeTile(this.tileNumber, key, event.target.value);
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
