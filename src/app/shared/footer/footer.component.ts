import { Component, OnInit } from '@angular/core';
import { brandResources } from 'src/app/shared/LocalData/BrandData';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  brandResources = brandResources;

  get env(): string {
    return environment.production ? '' : '[NON-PROD]';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
