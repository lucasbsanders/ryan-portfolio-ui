import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() public locations: any[] = [];
  @Input() public isSticky = true;

  constructor() { }

  ngOnInit(): void {
    this.locations.forEach(loc => {
      if (!loc.link) {
        loc.link = loc.title;
      }
    });
    if (this.isSticky) {
      document.getElementById('navbar')?.classList.add("sticky-top");
    }
  }

}
