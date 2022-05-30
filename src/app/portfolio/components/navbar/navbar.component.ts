import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NavbarService } from '../../services/navbar.service';

enum Brand {
  primary = 'primary',
  secondary = 'secondary'
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  Brand = Brand;

  brandLinks = {
    primary: environment.icons.primary,
    secondary: environment.icons.secondary,
  };

  mouseIn = false;

  get brandSelection(): Brand {
    return !this.menuOpen ? Brand.primary : Brand.secondary;
  }

  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  get isAtTop(): boolean {
    return this.navbarService.isAtTop;
  }

  get smallScreen(): boolean {
    return this.navbarService.isSmallScreen;
  }

  get isHomepage(): boolean {
    return this.navbarService.isHomepage;
  }

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.onResize();
  }

  mouseOverBrand(mouseIn: boolean) {
    this.mouseIn = mouseIn;
  }

  clickBrand(): void {
    this.mouseOverBrand(true);
    this.setMenuOpen(false);
    this.navbarService.menuOpen = false;
  }

  clickMenuButton(): void {
    this.mouseOverBrand(false);
    this.setMenuOpen(!this.navbarService.menuOpen);
  }

  setMenuOpen(menuOpen: boolean): void {
    this.navbarService.menuOpen = menuOpen;
  }

  onResize() {
    this.navbarService.onResize(window.outerWidth);
  }

}
