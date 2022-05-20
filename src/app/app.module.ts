import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageDisplayComponent } from './components/page-display/page-display.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { EnterViewPortDirective } from './shared/directives/enter-view-port.directive';
import { SharedModule } from './shared/shared.module';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { ImageGridComponent } from './components/image-grid/image-grid.component';
import { TextDisplayComponent } from './components/text-display/text-display.component';
import { FullscreenMenuComponent } from './components/fullscreen-menu/fullscreen-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    EnterViewPortDirective,
    FullscreenMenuComponent,
    ProjectDetailsComponent,
    PageDisplayComponent,
    SlideshowComponent,
    ImageGridComponent,
    TextDisplayComponent,
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
