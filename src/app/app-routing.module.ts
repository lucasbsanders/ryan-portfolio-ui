import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageEditComponent } from './admin/components/page-edit/page-edit.component';
import { PageDisplayComponent } from './portfolio/components/page-display/page-display.component';
import { PageNotFoundComponent } from './shared/PageNotFound';
import { ContactMeComponent } from './portfolio/components/contact-me/contact-me.component';
import { PasswordPageComponent } from './portfolio/components/password-page/password-page.component';
import { NoPasswordPage, PasswordPage } from './auth-guards';

const routes: Routes = [
  {
    path: '',
    component: PasswordPageComponent,
    canActivate: [NoPasswordPage],
  },
  {
    path: 'contact',
    component: ContactMeComponent,
    canActivate: [PasswordPage],
  },
  { path: 'error', component: PageNotFoundComponent },
  {
    path: ':route',
    component: PageDisplayComponent,
    canActivate: [PasswordPage],
  },
  {
    path: ':route/edit',
    component: PageEditComponent,
    canActivate: [PasswordPage],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
