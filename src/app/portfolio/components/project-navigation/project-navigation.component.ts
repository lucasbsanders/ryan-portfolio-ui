import { Component, Input, OnChanges } from '@angular/core';
import { ProjectNavigationService } from '../../services/project-navigation.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-project-navigation',
  templateUrl: './project-navigation.component.html',
  styleUrls: ['./project-navigation.component.scss'],
})
export class ProjectNavigationComponent implements OnChanges {

  @Input() current: string = '';

  previousIndex: number = -1;
  nextIndex: number = -1;

  get orderedProjects(): string[] {
    return this.projectNavService.orderedProjects;
  }

  get isSmallScreen(): boolean {
    return this.navbarService.isSmallScreen;
  }

  constructor(private navbarService: NavbarService,
    private projectNavService: ProjectNavigationService) {}

  ngOnChanges(): void {
    this.previousIndex = -1;
    this.nextIndex = -1;

    const currentIndex = this.orderedProjects.findIndex(
      (proj: string) => proj === this.current
    );

    if (currentIndex > -1) {
      this.previousIndex = currentIndex - 1;
      this.nextIndex = currentIndex + 1;
      if (this.nextIndex >= this.orderedProjects.length) this.nextIndex = -1;
    }
  }

}
