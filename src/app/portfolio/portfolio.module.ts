import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { FullscreenMenuComponent } from './components/fullscreen-menu/fullscreen-menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageDisplayComponent } from './components/page-display/page-display.component';
import { ProjectNavigationComponent } from './components/project-navigation/project-navigation.component';
import { ImageGridComponent } from './components/tiles/image-grid/image-grid.component';
import { ImageSubtitleComponent } from './components/tiles/image-subtitle/image-subtitle.component';
import { SlideshowComponent } from './components/tiles/slideshow/slideshow.component';
import { TextDisplayComponent } from './components/tiles/text-display/text-display.component';
import { TitleComponent } from './components/tiles/title/title.component';
import { VimeoVideoComponent } from './components/tiles/vimeo-video/vimeo-video.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FullscreenMenuComponent,
    PageDisplayComponent,
    SlideshowComponent,
    ImageGridComponent,
    TextDisplayComponent,
    VimeoVideoComponent,
    ImageSubtitleComponent,
    TitleComponent,
    ProjectNavigationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    FullscreenMenuComponent,
    PageDisplayComponent,
    SlideshowComponent,
    ImageGridComponent,
    TextDisplayComponent,
    VimeoVideoComponent,
    ImageSubtitleComponent,
    TitleComponent,
    ProjectNavigationComponent,
  ]
})
export class PortfolioModule { }
