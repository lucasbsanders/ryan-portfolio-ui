import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ResourcePathsService } from 'src/app/services/resource-paths.service';
import { videoPreviews } from 'src/app/shared/LocalData/VideoData';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent  {

  videos: any[] = videoPreviews;
  brands = this.resources.getBrandIcons();

  constructor(private resources: ResourcePathsService,
    private router: Router) { }

  parseBrandName(brandPath: string): string {
    return brandPath.substring(brandPath.lastIndexOf('/') + 1, brandPath.indexOf('.'));
  }

  goToVideo(id: Guid) {
    this.router.navigate(['details/' + id.toString()]);
  }

}
