import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullscreenMenuComponent } from './helpers/fullscreen-menu/fullscreen-menu.component';
import { ImageGridComponent } from './components/image-grid/image-grid.component';
import { PageDisplayComponent } from './components/page-display/page-display.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { TextDisplayComponent } from './components/text-display/text-display.component';
import { VimeoVideoComponent } from './components/vimeo-video/vimeo-video.component';
import { EnterViewPortDirective } from './shared/directives/enter-view-port.directive';
import { SharedModule } from './shared/shared.module';
import { ImageSubtitleComponent } from './components/image-subtitle/image-subtitle.component';
import { ImageComponent } from './helpers/image/image.component';
import { RowWidthAdjustComponent } from './helpers/row-width-adjust/row-width-adjust.component';

@NgModule({
  declarations: [
    AppComponent,
    EnterViewPortDirective,
    FullscreenMenuComponent,
    PageDisplayComponent,
    SlideshowComponent,
    ImageGridComponent,
    TextDisplayComponent,
    VimeoVideoComponent,
    ImageSubtitleComponent,
    ImageComponent,
    RowWidthAdjustComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
