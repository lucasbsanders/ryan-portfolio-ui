import { Component, Input } from '@angular/core';
import { TileType } from 'src/app/shared/enums.const';
import { iTile } from 'src/app/shared/interfaces.const';

@Component({
  selector: 'app-tile-switch-statement',
  templateUrl: './tile-switch-statement.component.html',
  styleUrls: ['./tile-switch-statement.component.scss'],
})
export class TileSwitchStatementComponent {
  readonly TileType = TileType;

  @Input() tile: iTile | undefined;
}
