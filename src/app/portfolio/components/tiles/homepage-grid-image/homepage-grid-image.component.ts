import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/portfolio/services/navbar.service';

@Component({
  selector: 'app-homepage-grid-image',
  templateUrl: './homepage-grid-image.component.html',
  styleUrls: ['./homepage-grid-image.component.scss']
})
export class HomepageGridImageComponent implements OnInit {

  constructor(private navbarService: NavbarService) { }

  get isSmallScreen(): boolean {
    return this.navbarService.isSmallScreen;
  }

  ngOnInit(): void {
  }

}
