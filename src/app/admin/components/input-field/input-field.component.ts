import { Component, Input, OnInit } from '@angular/core';
import { PageEditService } from '../../services/page-edit.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {
  
  @Input() tileNumber: number = -1;
  @Input() imageNumber: number = -1;
  @Input() key: string = '';
  @Input() obj: any = {};

  constructor(private pageEdit: PageEditService) {}

  ngOnInit(): void {}

  typeOf(obj: any): string {
    return typeof obj;
  }

  json(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  changeText(key: string, event: any) {
    if (this.imageNumber > -1) this.changeImage(key, event.target.value);
    else this.pageEdit.changeTile(this.tileNumber, key, event.target.value);
  }

  changeNumber(key: string, event: any) {
    if (this.imageNumber > -1)
      this.changeImage(key, parseInt(event.target.value));
    else
      this.pageEdit.changeTile(
        this.tileNumber,
        key,
        parseInt(event.target.value)
      );
  }

  changeCheckbox(key: string, event: any) {
    if (this.imageNumber > -1) this.changeImage(key, event.target.checked);
    else this.pageEdit.changeTile(this.tileNumber, key, event.target.checked);
  }

  changeObject(key: string, event: any) {
    try {
      const tileData = JSON.parse(event.target.value);

      if (this.imageNumber > -1) this.changeImage(key, tileData);
      else this.pageEdit.changeTile(this.tileNumber, key, tileData);

      this.styleTextarea(event.target, '3px solid lime');
    } catch (err) {
      this.styleTextarea(event.target, '3px solid red');
    }
  }

  private changeImage(key: string, value: any) {
    this.pageEdit.changeImage(this.tileNumber, this.imageNumber, key, value);
  }

  styleTextarea(element: any, borderStyle: string) {
    element.style.border = borderStyle;
    element.style.height = '0px';
    element.style.height = element.scrollHeight + 5 + 'px';
  }
}
