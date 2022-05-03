import { Component } from '@angular/core';
import { ResourcePathsService } from 'src/app/services/resource-paths.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {

  selfImg: string;
  aboutMeText: string;

  constructor(private resources: ResourcePathsService) {
    this.selfImg = this.resources.getConstUrls().primary;
    this.aboutMeText = this.resources.aboutMeDescription();
  }

}
