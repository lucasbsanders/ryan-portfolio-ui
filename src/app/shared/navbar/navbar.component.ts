import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { resources } from 'src/app/shared/LocalData/BrandData';
import { environment } from 'src/environments/environment';

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

  brandLinks: any;
  brandSelection = Brand.primary;

  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.brandLinks = resources;
  }

  public switchBrand() {
    this.brandSelection = this.brandSelection == Brand.primary ? Brand.secondary : Brand.primary;
  }

  public clickMenuButton(): void {
    this.switchBrand();
    this.navbarService.menuOpen = !this.navbarService.menuOpen;
  }

}
