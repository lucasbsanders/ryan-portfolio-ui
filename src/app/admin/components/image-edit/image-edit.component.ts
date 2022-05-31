import { Component, Input } from '@angular/core';
import { PageEditService } from '../../services/page-edit.service';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss'],
})
export class ImageEditComponent {

  @Input() imageNumber: number = 0;
  @Input() tileNumber: number = 0;

  newFieldName = '';

  get Image() {
    return this.pageEdit.getImage(this.tileNumber, this.imageNumber);
  }

  get Keys(): string[] {
    return this.Image ? Object.keys(this.Image) : [];
  }

  constructor(private pageEdit: PageEditService) {}

  typeOf(obj: any): string {
    return typeof obj;
  }

  setNewFieldName(event: any) {
    this.newFieldName = event.target.value;
  }

  addField(obj: any) {
    this.changeImage(this.newFieldName, obj);
    this.newFieldName = '';
  }
  
  changeImageText(key: string, event: any) {
    this.changeImage(key, event.target.value);
  }

  changeImageNumber(key: string, event: any) {
    this.changeImage(key, parseInt(event.target.value));
  }

  changeImageCheckbox(key: string, event: any) {
    this.changeImage(key, event.target.checked);
  }

  json(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  changeImageObject(key: string, event: any) {
    try {
      const tileData = JSON.parse(event.target.value);
      this.changeImage(key, tileData);

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

  removeField(key: string) {
    this.changeImage(key, null)
  }

  deleteImage() {
    this.pageEdit.deleteImage(this.tileNumber, this.Image.order);
  }

  private changeImage(key: string, value: any) {
    this.pageEdit.changeImage(this.tileNumber, this.Image.order, key, value);
  }

}
