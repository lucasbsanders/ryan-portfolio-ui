import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { LocalResourceService } from 'src/app/services/local-resource.service';
import { ProjectService } from 'src/app/services/project.service';
import { VideoDataService } from 'src/app/services/video-data.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent  {

  Guid = Guid;
  videoPreviews: any[] = [];
  videoPreviews2: any[] = [];
  brandsAsImg: string[] = [];
  mouseOverId = '';
  portfolioLoading = true;
  brandsLoading = true;

  constructor(private resourceService: LocalResourceService,
    private videoService: VideoDataService,
    private projectService: ProjectService,
    private router: Router) {
      //this.videoPreviews = this.videoService.getAllVideoPreviews();
      this.resourceService.getBrandIcons().subscribe(iconUrls => {
        this.brandsAsImg = iconUrls;
        this.brandsLoading = false;
      });
      this.projectService.getProjectPreviews().subscribe(previews => {
        this.videoPreviews = previews;
        this.portfolioLoading = false;
      });
    }

  goToVideo(id: Guid) {
    this.router.navigate(['details/' + id.toString()]);
  }

  offsetClass(index: number, length: number) {
    return (index + 1) === length && (index + 1) % 2 == 1 ? 'offset-md-3' : 'offset-md-0';
  }

}
