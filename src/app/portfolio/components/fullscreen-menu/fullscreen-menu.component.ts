import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { environment } from 'src/environments/environment';
import { Brand } from 'src/app/shared/enums.const';

@Component({
  selector: 'app-fullscreen-menu',
  templateUrl: './fullscreen-menu.component.html',
  styleUrls: ['./fullscreen-menu.component.scss'],
})
export class FullscreenMenuComponent implements OnInit, AfterViewInit {

  menuData: any[] = [];
  icons = environment.icons;

  get brandSelection(): string {
    return this.icons ?
      !this.isMenuOpen ? environment.icons.primary : environment.icons.secondary
      : '';
  }

  get isMenuOpen(): boolean {
    return this.navbarService.isMenuOpen;
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

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.getMenuData()
      .subscribe((menuData: any) =>
        this.menuData = menuData.sort((a: any, b: any) => a.order - b.order)
      );
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  onResize() {
    this.navbarService.onResize(window.outerWidth);
  }

  closeMenu(event: any) {
    if (!event.ctrlKey) this.setMenuOpen(false);
  }

  clickBrand(): void {
    this.setMenuOpen(false);
    this.navbarService.isMenuOpen = false;
  }

  clickMenuButton(): void {
    this.setMenuOpen(!this.navbarService.isMenuOpen);
  }

  setMenuOpen(isMenuOpen: boolean): void {
    this.navbarService.isMenuOpen = isMenuOpen;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler( event: KeyboardEvent) {
    if (this.navbarService.isMenuOpen && (event.key === 'Escape' || event.key === 'Esc')) {
      this.setMenuOpen(false);
    }
  }
}
