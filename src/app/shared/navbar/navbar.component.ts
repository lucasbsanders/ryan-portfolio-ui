import { Component } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { LocalResourceService } from 'src/app/services/local-resource.service';

enum Brand {
  primary = 'primary',
  secondary = 'secondary'
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  Brand = Brand;
  brandLinks: any;
  mouseIn = false;

  get brandSelection(): Brand {
    return (this.mouseIn === this.menuOpen) ? Brand.primary : Brand.secondary;
  }

  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  get isAtTop(): boolean {
    return this.navbarService.isAtTop;
  }

  constructor(private navbarService: NavbarService,
    private resourceService: LocalResourceService) {
      this.brandLinks = this.resourceService.getConstUrls();
    }

  public mouseOverBrand(mouseIn: boolean) {
    this.mouseIn = mouseIn;
  }

  public clickBrand(): void {
    this.mouseOverBrand(true);
    this.navbarService.menuOpen = false;
  }

  public clickMenuButton(): void {
    this.mouseOverBrand(false);
    this.navbarService.menuOpen = !this.navbarService.menuOpen;
  }

}
