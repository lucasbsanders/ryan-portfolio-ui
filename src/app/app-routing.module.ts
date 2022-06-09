import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageEditComponent } from './admin/components/page-edit/page-edit.component';
import { PageDisplayComponent } from './portfolio/components/page-display/page-display.component';
import { PageNotFoundComponent } from './shared/PageNotFound';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'portfolio' },
  { path: ':path', component: PageDisplayComponent },
  { path: ':path/edit', component: PageEditComponent },
  { path: 'error', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
