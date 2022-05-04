import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { FullscreenMenuComponent } from './fullscreen-menu/fullscreen-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { Page404Component } from './404';
import { RowSplitPipe } from './row-double.pipe';
import { HtmlSanitizePipe } from './html-sanitize.pipe';
import { FilenamePipe } from './filename.pipe';
import { SplitTextPipe } from './split-text.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FullscreenMenuComponent,
    Page404Component,
    RowSplitPipe,
    HtmlSanitizePipe,
    FilenamePipe,
    SplitTextPipe,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    RowSplitPipe,
    HtmlSanitizePipe,
    FilenamePipe,
    SplitTextPipe
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    FullscreenMenuComponent,
    Page404Component,
    RowSplitPipe,
    HtmlSanitizePipe,
    FilenamePipe,
    SplitTextPipe
  ]
})
export class SharedModule { }
