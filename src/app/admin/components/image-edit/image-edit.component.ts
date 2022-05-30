import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent {

  @Input() image: any = {};
  @Output() changeImage = new EventEmitter<any[]>();

  newFieldName = '';

  constructor() { }

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

  setNewFieldName(event: any) {
    this.newFieldName = event.target.value;
  }

  addField(obj: any) {
    this.changeImage.emit([this.image.order, this.newFieldName, obj]);
    this.newFieldName = '';
  }

  changeImageText(key: string, event: any) {
    this.changeImage.emit([this.image.order, key, event.target.value]);
  }

  changeImageNumber(key: string, event: any) {
    this.changeImage.emit([this.image.order, key, parseInt(event.target.value)]);
  }

  changeImageCheckbox(key: string, event: any) {
    this.changeImage.emit([this.image.order, key, event.target.checked]);
  }

  removeImageKey(order: number, key: string) {
    this.changeImage.emit([order, key, null]);
  }

}
