import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { CapabilitiesComponent } from './components/capabilities/capabilities.component';
import { CollectionComponent } from './components/Decomissioned/collection/collection.component';
import { HomeComponent } from './components/Decomissioned/home/home.component';
import { IllustratedBooksComponent } from './components/illustrated-books/illustrated-books.component';
import { ImageDetailsComponent } from './components/Decomissioned/image-details/image-details.component';
import { ImageFullscreenComponent } from './components/Decomissioned/image-fullscreen/image-fullscreen.component';
import { ImageSquareComponent } from './components/Decomissioned/image-square/image-square.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { EnterViewPortDirective } from './shared/enter-view-port.directive';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    CollectionComponent,
    HomeComponent,
    ImageFullscreenComponent,
    ImageDetailsComponent,
    ImageSquareComponent,
    EnterViewPortDirective,
    PortfolioComponent,
    AboutMeComponent,
    ProjectDetailsComponent,
    IllustratedBooksComponent,
    CapabilitiesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
