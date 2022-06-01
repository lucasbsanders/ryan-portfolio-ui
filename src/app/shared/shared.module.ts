import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageComponent } from './components/image/image.component';
import { RowWidthAdjustComponent } from './components/row-width-adjust/row-width-adjust.component';
import { EnterViewPortDirective } from './directives/enter-view-port.directive';
import { PageNotFoundComponent } from './PageNotFound';
import { FilenamePipe } from './pipes/filename.pipe';
import { HtmlSanitizePipe } from './pipes/html-sanitize.pipe';
import { KeyToS3Pipe } from './pipes/key-to-s3.pipe';
import { RowSplitPipe } from './pipes/row-double.pipe';
import { SplitTextPipe } from './pipes/split-text.pipe';
import { UrlSanitizePipe } from './pipes/url-sanitize.pipe';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    RowWidthAdjustComponent,
    ImageComponent,
    RowSplitPipe,
    HtmlSanitizePipe,
    FilenamePipe,
    SplitTextPipe,
    KeyToS3Pipe,
    EnterViewPortDirective,
    UrlSanitizePipe
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
    KeyToS3Pipe,
    UrlSanitizePipe
  ],
  exports: [
    PageNotFoundComponent,
    RowWidthAdjustComponent,
    ImageComponent,
    RowSplitPipe,
    HtmlSanitizePipe,
    FilenamePipe,
    SplitTextPipe,
    KeyToS3Pipe,
    EnterViewPortDirective,
    UrlSanitizePipe
  ]
})
export class SharedModule { }
