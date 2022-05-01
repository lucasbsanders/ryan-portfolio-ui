import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { navbarResources } from 'src/app/shared/localData/ImageData';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  navbarLinks = navbarResources;
  get menuOpen() {
    return this.navbarService.menuOpen;
  }

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
  }

}
