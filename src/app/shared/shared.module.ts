import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { FullscreenMenuComponent } from './fullscreen-menu/fullscreen-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { Page404Component } from './404';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FullscreenMenuComponent,
    Page404Component,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    FullscreenMenuComponent,
    Page404Component,
  ]
})
export class SharedModule { }
