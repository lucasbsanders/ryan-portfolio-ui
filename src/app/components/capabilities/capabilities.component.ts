import { Component } from '@angular/core';
import { ResourcePathsService } from 'src/app/services/resource-paths.service';
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

  constructor(private resources: ResourcePathsService,
    private videoService: VideoDataService) {
      this.videoReelHtml = this.videoService.getVideoReelHtml();
      this.softwareImg = this.resources.getConstUrls().primary;
      this.servicesText = this.resources.servicesDescription();
    }

}
