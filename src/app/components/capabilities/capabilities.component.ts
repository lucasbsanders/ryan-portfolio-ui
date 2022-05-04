import { Component } from '@angular/core';
import { LocalResourceService } from 'src/app/services/local-resource.service';
import { VideoDataService } from 'src/app/services/video-data.service';

@Component({
  selector: 'app-capabilities',
  templateUrl: './capabilities.component.html',
  styleUrls: ['./capabilities.component.scss']
})
export class CapabilitiesComponent {

  videoReelHtml: string;
  softwareImg: string;
  servicesText: string;

  constructor(private resourceService: LocalResourceService,
    private videoService: VideoDataService) {
      this.videoReelHtml = this.videoService.getVideoReelHtml();
      this.softwareImg = this.resourceService.getConstUrls().primary;
      this.servicesText = this.resourceService.servicesDescription();
    }

}
