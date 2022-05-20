import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageDisplayComponent } from './components/page-display/page-display.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { PageNotFoundComponent } from './shared/PageNotFound';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'portfolio' },
  { path: 'details/:id', component: ProjectDetailsComponent },
  { path: ':path', component: PageDisplayComponent },
  { path: 'error', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
