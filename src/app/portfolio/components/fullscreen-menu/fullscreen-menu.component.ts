import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-fullscreen-menu',
  templateUrl: './fullscreen-menu.component.html',
  styleUrls: ['./fullscreen-menu.component.scss'],
})
export class FullscreenMenuComponent implements OnInit {

  menuData: any[] = [];

  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService
      .getMenuData()
      .subscribe(
        (menuData: any) =>
          (this.menuData = menuData.sort((a: any, b: any) => a.order - b.order))
      );
  }

  closeMenu(event: any) {
    if (!event.ctrlKey)
      this.navbarService.menuOpen = false;
  }
}
