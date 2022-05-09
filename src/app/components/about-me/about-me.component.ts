import { Component } from '@angular/core';
import { LocalResourceService } from 'src/app/services/local-resource.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {

  selfImg: string = '';
  aboutMeText: string;

  constructor(private resourceService: LocalResourceService) {
    this.resourceService.getHeadshot().subscribe(headshotUrl => this.selfImg = headshotUrl);
    this.aboutMeText = this.resourceService.aboutMeDescription();
  }

}
