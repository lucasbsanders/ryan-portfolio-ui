import { Component, HostListener, OnInit } from '@angular/core';
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
    if (!event.ctrlKey) this.setMenuOpen(false);
  }

  clickMenuButton(): void {
    this.setMenuOpen(!this.navbarService.menuOpen);
  }

  setMenuOpen(menuOpen: boolean): void {
    this.navbarService.menuOpen = menuOpen;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler( event: KeyboardEvent) {
    if (this.navbarService.menuOpen && (event.key === 'Escape' || event.key === 'Esc')) {
      this.setMenuOpen(false);
    }
  }
}
