import { Component, Input, OnChanges } from '@angular/core';
import { ProjectNavigationService } from '../../services/project-navigation.service';

@Component({
  selector: 'app-project-navigation',
  templateUrl: './project-navigation.component.html',
  styleUrls: ['./project-navigation.component.scss'],
})
export class ProjectNavigationComponent implements OnChanges {

  @Input() current = '';

  get orderedProjects(): string[] {
    return this.projectNavService.orderedProjects;
  }

  previousIndex = -1;
  nextIndex = -1;

  constructor(private projectNavService: ProjectNavigationService) {}

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
