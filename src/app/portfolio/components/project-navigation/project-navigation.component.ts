import { Component, Input, OnChanges } from '@angular/core';
import { ProjectNavigationService } from '../../services/project-navigation.service';
import { NavbarService } from '../../services/navbar.service';
import { Width } from 'src/app/shared/enums.const';

@Component({
  selector: 'app-project-navigation',
  templateUrl: './project-navigation.component.html',
  styleUrls: ['./project-navigation.component.scss'],
})
export class ProjectNavigationComponent implements OnChanges {
  @Input() currentProjectLink: string = '';

  Width = Width;
  previousIndex: number = -1;
  nextIndex: number = -1;

  get orderedProjectLinks(): string[] {
    return this.projectNavService.orderedProjectLinks;
  }

  get isSmallScreen(): boolean {
    return this.navbarService.isSmallScreen;
  }

  constructor(
    private navbarService: NavbarService,
    private projectNavService: ProjectNavigationService
  ) {}

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
