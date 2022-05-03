import { Component, OnInit } from '@angular/core';
import { resources, servicesText } from 'src/app/shared/LocalData/BrandData';
import { videos } from 'src/app/shared/LocalData/VideoData';

@Component({
  selector: 'app-capabilities',
  templateUrl: './capabilities.component.html',
  styleUrls: ['./capabilities.component.scss']
})
export class CapabilitiesComponent implements OnInit {

  videoHtml = <string>videos.video?.html;
  software = resources.primary;
  servicesText = servicesText;

  constructor() { }

  ngOnInit(): void {
  }

}