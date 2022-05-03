import { Component } from '@angular/core';
import { ResourcePathsService } from 'src/app/services/resource-paths.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  links: any;

  get envString(): string {
    return environment.production ? '' : ' [NON-PROD]';
  }

  constructor(private resources: ResourcePathsService) {
    this.links = this.resources.getConstUrls();
  }

}
