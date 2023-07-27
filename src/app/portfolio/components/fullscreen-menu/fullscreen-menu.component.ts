import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fullscreen-menu',
  templateUrl: './fullscreen-menu.component.html',
  styleUrls: ['./fullscreen-menu.component.scss'],
})
export class FullscreenMenuComponent implements OnInit, AfterViewInit {
  menuData: any[] = [];

  get brandSelection(): string {
    return environment.icons.primary;
  }

  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  get isAtTop(): boolean {
    return this.navbarService.isAtTop;
  }

  get isSmallScreen(): boolean {
    return this.navbarService.isSmallScreen;
  }

  get isHomepage(): boolean {
    return this.navbarService.isHomepage;
  }

  get isProduction(): boolean {
    return environment.production;
  }

  constructor(private router: Router, private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService
      .getMenuData()
      .subscribe(
        (menuData: any) =>
          (this.menuData = menuData.sort((a: any, b: any) => a.order - b.order))
      );
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  openEditPage(): void {
    this.router.navigate([decodeURI(this.router.url), 'edit']);
  }

  openWindow(url: string) {
    window.open(url);
  }

  clickOption(option: any) {
    if (option.route) {
      this.goToRoute(option.route);
    }
    if (option.url) {
      this.openWindow(option.url);
    }
  }

  goToRoute(route: string) {
    this.setMenuOpen(false);
    this.router.navigate([route]);
  }

  onResize() {
    this.navbarService.onResize(window.outerWidth);
  }

  closeMenu(event: any) {
    if (!event.ctrlKey) this.setMenuOpen(false);
  }

  clickBrand(): void {
    this.setMenuOpen(false);
    this.navbarService.menuOpen = false;
  }

  clickMenuButton(): void {
    this.setMenuOpen(!this.navbarService.menuOpen);
  }

  setMenuOpen(menuOpen: boolean): void {
    this.navbarService.menuOpen = menuOpen;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (
      this.navbarService.menuOpen &&
      (event.key === 'Escape' || event.key === 'Esc')
    ) {
      this.setMenuOpen(false);
    }
  }
}
