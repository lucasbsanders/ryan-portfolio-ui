import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AUTHORIZED_KEY } from 'src/app/shared/functions/cache-functions';
import { AuthService } from '../../services/auth.service';
import { PASSWORD_FAILURE_DELAY_TIME_MS } from 'src/app/shared/flags.const';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styleUrls: ['./password-page.component.scss'],
})
export class PasswordPageComponent implements OnInit, OnDestroy {
  public passwordLoading: boolean = false;
  public passwordControl: any;
  private pwdSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.pwdSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.passwordControl = new FormControl('');
    const userIsAuth = localStorage.getItem(AUTHORIZED_KEY) === 't';

    if (userIsAuth) {
      this.router.navigate(['/portfolio']);
    } else {
      this.pwdSubscription = this.activatedRoute.queryParamMap.subscribe(
        (query: ParamMap) => {
          const password = query?.get('p');
          const hash = query?.get('h');

          if (password) {
            this.checkPasswordAndRedirect(password, true);
          } else if (hash) {
            this.checkPasswordAndRedirect(hash, false);
          }
        }
      );
    }
  }

  public submitPassword() {
    if (this.passwordControl.value) {
      this.checkPasswordAndRedirect(this.passwordControl.value, true);
      this.passwordControl.setValue('');
    }
  }

  private checkPasswordAndRedirect(
    password: string,
    applyHashToPassword: boolean
  ) {
    this.passwordLoading = true;

    this.authService
      .submitPasswordAndSetAuthKey(password, applyHashToPassword)
      .subscribe((isAuth) => {
        if (isAuth) {
          this.router.navigate(['/portfolio']);
        } else {
          setTimeout(() => {
            this.router.navigate(['/']);
            this.passwordLoading = false;
          }, PASSWORD_FAILURE_DELAY_TIME_MS);
        }
      });
  }
}
