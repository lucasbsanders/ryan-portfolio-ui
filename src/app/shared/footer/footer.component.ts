import { Component } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  links: any;

  get envString(): string {
    return environment.production ? '' : '[NonProd]';
  }

  get smallIcon(): string {
    return environment.icons.small;
  }

  constructor(private navService: NavbarService) {
      this.navService.getFooterData().subscribe(data => this.links = data);
  }

}
