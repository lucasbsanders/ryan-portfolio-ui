import { Component } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { ResourcePathsService } from 'src/app/services/resource-paths.service';

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

  constructor(private navbarService: NavbarService,
    private resources: ResourcePathsService) {
      this.brandLinks = this.resources.getConstUrls();
    }

  public mouseOverBrand(mouseIn: boolean) {
    this.mouseIn = mouseIn;
  }

  public clickMenuButton(): void {
    this.mouseOverBrand(false);
    this.navbarService.menuOpen = !this.navbarService.menuOpen;
  }

}
