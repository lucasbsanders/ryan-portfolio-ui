import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-fullscreen-menu',
  templateUrl: './fullscreen-menu.component.html',
  styleUrls: ['./fullscreen-menu.component.scss']
})
export class FullscreenMenuComponent implements OnInit {
  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  videoReelUrl = 'https://duckduckgo.com';

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
  }

}
