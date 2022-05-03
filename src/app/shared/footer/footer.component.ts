import { Component } from '@angular/core';
import { resources } from 'src/app/shared/LocalData/BrandData';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  resources = resources;

  get env(): string {
    return environment.production ? '' : '[NON-PROD]';
  }

  constructor() { }

}
