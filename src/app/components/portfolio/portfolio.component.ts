import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { LocalResourceService } from 'src/app/services/local-resource.service';
import { VideoDataService } from 'src/app/services/video-data.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent  {

  Guid = Guid;
  videoPreviews: any[];
  brandsAsImg: string[];
  mouseOverId = Guid.createEmpty();

  constructor(private resourceService: LocalResourceService,
    private videoService: VideoDataService,
    private router: Router) {
      this.videoPreviews = this.videoService.getAllVideoPreviews();
      this.brandsAsImg = this.resourceService.getBrandIcons();
    }

  parseBrandName(brandPath: string): string {
    return brandPath.substring(brandPath.lastIndexOf('/') + 1, brandPath.indexOf('.'));
  }

  goToVideo(id: Guid) {
    this.router.navigate(['details/' + id.toString()]);
  }

  offsetClass(index: number, length: number) {
    return (index + 1) === length && (index + 1) % 2 == 1 ? 'offset-md-3' : 'offset-md-0';
  }

}
