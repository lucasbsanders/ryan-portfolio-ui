import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { FullscreenMenuComponent } from './fullscreen-menu/fullscreen-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './PageNotFound';
import { RowSplitPipe } from './pipes/row-double.pipe';
import { HtmlSanitizePipe } from './pipes/html-sanitize.pipe';
import { FilenamePipe } from './pipes/filename.pipe';
import { SplitTextPipe } from './pipes/split-text.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FullscreenMenuComponent,
    PageNotFoundComponent,
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
    PageNotFoundComponent,
    RowSplitPipe,
    HtmlSanitizePipe,
    FilenamePipe,
    SplitTextPipe
  ]
})
export class SharedModule { }
