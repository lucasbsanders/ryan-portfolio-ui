import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PageEditService } from '../../services/page-edit.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnChanges {
  @Input() tileNumber: number = -1;
  @Input() imageNumber: number = -1;
  @Input() key: string = '';
  @Input() obj: any = {};
  @Input() type: string = '';
  public jsonObj = '';

  @ViewChild('inputRef', { read: ElementRef }) inputRef!: ElementRef;

  constructor(private pageEdit: PageEditService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['obj'].currentValue && this.type === 'object') {
      this.jsonObj = this.json(changes['obj'].currentValue);
    }
  }

  json(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  changeText(key: string, event: any) {
    if (this.imageNumber > -1) this.changeImage(key, event.target.value ?? '');
    else
      this.pageEdit.changeTile(this.tileNumber, key, event.target.value ?? '');
  }

  changeNumber(key: string, event: any) {
    console.log(event.target.value);
    if (this.imageNumber > -1)
      this.changeImage(key, parseInt(event.target.value) || 0);
    else
      this.pageEdit.changeTile(
        this.tileNumber,
        key,
        parseInt(event.target.value) || 0
      );
  }

  changeCheckbox(key: string, event: any) {
    if (this.imageNumber > -1)
      this.changeImage(key, Boolean(event.target.checked));
    else
      this.pageEdit.changeTile(
        this.tileNumber,
        key,
        Boolean(event.target.checked)
      );
  }

  changeObject(key: string, event: any) {
    var tileData = {};
    try {
      tileData = JSON.parse(event.target.value) ?? {};

      if (this.imageNumber > -1) this.changeImage(key, tileData);
      else this.pageEdit.changeTile(this.tileNumber, key, tileData);
    } catch (err) {
      this.styleTextarea('2px solid red');
    }
  }

  private changeImage(key: string, value: any) {
    this.pageEdit.changeImage(this.tileNumber, this.imageNumber, key, value);
  }

  styleTextarea(borderStyle?: string) {
    if (borderStyle) this.inputRef.nativeElement.style.border = borderStyle;
  }
}
