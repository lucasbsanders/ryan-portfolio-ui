import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DisplayItem } from 'src/app/shared/models/DisplayItem';

@Component({
  selector: 'app-image-fullscreen',
  templateUrl: './image-fullscreen.component.html',
  styleUrls: ['./image-fullscreen.component.scss']
})
export class ImageFullscreenComponent implements OnInit {

  @Input() focusItemObservable = new Observable<DisplayItem>();

  public displayStyle = "none";
  public displayItem: DisplayItem = <DisplayItem>{};

  constructor() { }

  ngOnInit(): void {
    this.focusItemObservable.subscribe(displayItem => {
      this.displayItem = displayItem;
      this.viewFullscreen(true);
    })
  }

  public viewFullscreen(isOpen: boolean): void {
    this.displayStyle = isOpen ? 'block' : 'none';
    document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
  }

}
