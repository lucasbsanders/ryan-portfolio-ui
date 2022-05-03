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

  brandLinks: any;
  brandSelection = Brand.primary;

  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  constructor(private navbarService: NavbarService,
    private resources: ResourcePathsService) {
      this.brandLinks = this.resources.getConstUrls();
    }

  public switchBrand() {
    this.brandSelection = this.brandSelection == Brand.primary ? Brand.secondary : Brand.primary;
  }

  public clickMenuButton(): void {
    this.switchBrand();
    this.navbarService.menuOpen = !this.navbarService.menuOpen;
  }

}
