import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { SharedModule } from '../shared/shared.module';
import { ImageEditComponent } from './components/image-edit/image-edit.component';
import { OrderScrollComponent } from './components/order-scroll/order-scroll.component';
import { PageEditComponent } from './components/page-edit/page-edit.component';
import { TileEditComponent } from './components/tile-edit/tile-edit.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PageEditComponent,
    TileEditComponent,
    ImageEditComponent,
    OrderScrollComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PortfolioModule    
  ],
  exports: [
    PageEditComponent,
    TileEditComponent,
    ImageEditComponent
  ]
})
export class AdminModule { }
