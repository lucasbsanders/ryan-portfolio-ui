import { Component } from '@angular/core';
import { LocalResourceService } from 'src/app/services/local-resource.service';
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

  constructor(private resourceService: LocalResourceService) {
    this.links = this.resourceService.getConstUrls();
  }

}
