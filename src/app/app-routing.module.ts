import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { CapabilitiesComponent } from './components/capabilities/capabilities.component';
import { IllustratedBooksComponent } from './components/illustrated-books/illustrated-books.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { Page404Component } from './shared/404';

const routes: Routes = [
  { path: '', component: PortfolioComponent },
  { path: 'details/:id', component: ProjectDetailsComponent },
  { path: 'services', component: CapabilitiesComponent },
  { path: 'about', component: AboutMeComponent },
  { path: 'books', component: IllustratedBooksComponent },
  { path: 'error', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
