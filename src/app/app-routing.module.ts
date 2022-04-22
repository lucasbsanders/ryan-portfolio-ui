import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './components/collection/collection.component';
import { HomeComponent } from './components/home/home.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { Page404Component } from './shared/404';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: ImageDetailsComponent },
  { path: 'error', component: Page404Component },
  { path: ':collection', component: CollectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
