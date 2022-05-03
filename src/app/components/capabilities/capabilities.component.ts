import { Component } from '@angular/core';
import { ResourcePathsService } from 'src/app/services/resource-paths.service';
import { videos } from 'src/app/shared/LocalData/VideoData';

@Component({
  selector: 'app-capabilities',
  templateUrl: './capabilities.component.html',
  styleUrls: ['./capabilities.component.scss']
})
export class CapabilitiesComponent {

  videoHtml = <string>videos.video?.html;
  software = this.resources.getConstUrls().primary;
  servicesText = this.resources.servicesDescription();

  constructor(private resources: ResourcePathsService) { }

}
