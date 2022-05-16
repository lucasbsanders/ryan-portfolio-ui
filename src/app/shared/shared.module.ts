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
import { KeyToS3Pipe } from './pipes/key-to-s3.pipe';

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
    KeyToS3Pipe,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    RowSplitPipe,
    HtmlSanitizePipe,
    FilenamePipe,
    SplitTextPipe,
    KeyToS3Pipe
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    FullscreenMenuComponent,
    PageNotFoundComponent,
    RowSplitPipe,
    HtmlSanitizePipe,
    FilenamePipe,
    SplitTextPipe,
    KeyToS3Pipe
  ]
})
export class SharedModule { }
