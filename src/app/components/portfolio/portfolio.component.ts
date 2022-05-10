import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalResourceService } from 'src/app/services/local-resource.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {

  videoPreviews: any[] = [];
  brandsAsImg: string[] = [];
  mouseOverId = '';

  portfolioLoading = true;
  brandsLoading = true;

  constructor(
    private projectService: ProjectService,
    private resourceService: LocalResourceService,
    private router: Router
  ) {
    this.projectService.getProjectPreviews().subscribe((previews) => {
      this.videoPreviews = previews;
      this.portfolioLoading = false;
    });

    this.resourceService.getBrandIcons().subscribe((iconUrls) => {
      this.brandsAsImg = iconUrls;
      this.brandsLoading = false;
    });
  }

  goToVideo(id: string) {
    this.router.navigate(['details/' + id.toString()]);
  }

  offsetClass(index: number, length: number) {
    return index + 1 === length && (index + 1) % 2 == 1
      ? 'offset-md-3'
      : 'offset-md-0';
  }
}
