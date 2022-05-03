import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { FullscreenMenuComponent } from './fullscreen-menu/fullscreen-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { Page404Component } from './404';
import { RowSplitPipe } from './row-double.pipe';
import { HtmlsanitizePipe } from './htmlsanitize.pipe';
import { FilenamePipe } from './filename.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FullscreenMenuComponent,
    Page404Component,
    RowSplitPipe,
    HtmlsanitizePipe,
    FilenamePipe,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    RowSplitPipe,
    HtmlsanitizePipe,
    FilenamePipe
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    FullscreenMenuComponent,
    Page404Component,
    RowSplitPipe,
    HtmlsanitizePipe,
    FilenamePipe
  ]
})
export class SharedModule { }
