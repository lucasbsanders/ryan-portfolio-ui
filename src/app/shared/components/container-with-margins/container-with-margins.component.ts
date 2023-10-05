import { Component, Input } from '@angular/core';
import { Width } from '../../enums.const';

@Component({
  selector: 'app-container-with-margins',
  templateUrl: './container-with-margins.component.html',
  styleUrls: ['./container-with-margins.component.scss'],
})
export class ContainerWithMarginsComponent {
  Width = Width;

  @Input() width?: Width;
  @Input() containerClass?: string = '';
  @Input() mt?: number = 0;
  @Input() mb?: number = 0;
}
