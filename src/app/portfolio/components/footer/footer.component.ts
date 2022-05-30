import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  links: any = {};

  get envString(): string {
    return environment.production ? '' : '[NonProd]';
  }

  get smallIcon(): string {
    return environment.icons.small;
  }

  constructor(private navbarService: NavbarService) {
      this.navbarService.getFooterData().subscribe(data => this.links = data);
  }

}
