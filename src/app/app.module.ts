import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { CapabilitiesComponent } from './components/capabilities/capabilities.component';
import { IllustratedBooksComponent } from './components/illustrated-books/illustrated-books.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { EnterViewPortDirective } from './shared/directives/enter-view-port.directive';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
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
