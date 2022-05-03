import { Component } from '@angular/core';
import { ResourcePathsService } from 'src/app/services/resource-paths.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {

  selfImg = this.resources.getConstUrls().primary;
  aboutMeText = this.resources.aboutMeDescription();

  constructor(private resources: ResourcePathsService) { }

}
