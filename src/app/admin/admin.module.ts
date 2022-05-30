import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { SharedModule } from '../shared/shared.module';
import { ImageEditComponent } from './components/image-edit/image-edit.component';
import { PageEditComponent } from './components/page-edit/page-edit.component';
import { TileEditComponent } from './components/tile-edit/tile-edit.component';

@NgModule({
  declarations: [
    PageEditComponent,
    TileEditComponent,
    ImageEditComponent
  ],
  imports: [
    CommonModule,
    PortfolioModule,
    SharedModule
  ],
  exports: [
    PageEditComponent,
    TileEditComponent,
    ImageEditComponent
  ]
})
export class AdminModule { }
