import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ProjectNavigationService } from '../../services/project-navigation.service';
import { NavbarService } from '../../services/navbar.service';
import { Width } from 'src/app/shared/enums.const';

@Component({
  selector: 'app-project-navigation',
  templateUrl: './project-navigation.component.html',
  styleUrls: ['./project-navigation.component.scss'],
})
export class ProjectNavigationComponent implements OnChanges, OnInit {
  @Input() currentProjectLink: string = '';

  Width = Width;
  previousIndex: number = -1;
  nextIndex: number = -1;
  orderedProjectLinks: string[] = [];

  get isSmallScreen(): boolean {
    return this.navbarService.isSmallScreen;
  }

  constructor(
    private navbarService: NavbarService,
    private projectNavService: ProjectNavigationService
  ) {}

  ngOnInit(): void {
    this.projectNavService
      .getOrderedProjectLinks()
      .subscribe((links: string[]) => {
        this.orderedProjectLinks = links;
        this.ngOnChanges();
      });
  }

  ngOnChanges(): void {
    this.previousIndex = -1;
    this.nextIndex = -1;

    const currentIndex = this.orderedProjectLinks.findIndex(
      (proj: string) => proj === this.currentProjectLink
    );

    if (currentIndex > -1) {
      this.previousIndex = currentIndex - 1;
      if (currentIndex < this.orderedProjectLinks.length - 1)
        this.nextIndex = currentIndex + 1;
    }
  }
}
