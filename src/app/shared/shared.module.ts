import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageComponent } from './components/image/image.component';
import { OrderScrollComponent } from './components/order-scroll/order-scroll.component';
import { RowWidthAdjustComponent } from './components/row-width-adjust/row-width-adjust.component';
import { EnterViewPortDirective } from './directives/enter-view-port.directive';
import { PageNotFoundComponent } from './PageNotFound';
import { FilenamePipe } from './pipes/filename.pipe';
import { HtmlSanitizePipe } from './pipes/html-sanitize.pipe';
import { KeyToS3Pipe } from './pipes/key-to-s3.pipe';
import { RowSplitPipe } from './pipes/row-double.pipe';
import { SplitTextPipe } from './pipes/split-text.pipe';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    RowWidthAdjustComponent,
    OrderScrollComponent,
    ImageComponent,
    RowSplitPipe,
    HtmlSanitizePipe,
    FilenamePipe,
    SplitTextPipe,
    KeyToS3Pipe,
    EnterViewPortDirective
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
  ],
  exports: [
    PageNotFoundComponent,
    RowWidthAdjustComponent,
    OrderScrollComponent,
    ImageComponent,
    RowSplitPipe,
    HtmlSanitizePipe,
    FilenamePipe,
    SplitTextPipe,
    KeyToS3Pipe,
    EnterViewPortDirective
  ]
})
export class SharedModule { }
