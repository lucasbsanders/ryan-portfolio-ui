import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AUTHORIZED_KEY } from 'src/app/shared/functions/cache-functions';
import { hashString } from 'src/app/shared/functions/hash-functions';
import { AuthService } from '../../services/auth.service';

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
            const passwordHash = hashString(password);
            this.checkPasswordAndRedirect(passwordHash);
          } else if (hash) {
            this.checkPasswordAndRedirect(hash);
          }
        }
      );
    }
  }

  public submitPassword() {
    if (this.passwordControl.value) {
      const passwordHash = hashString(this.passwordControl.value);
      this.checkPasswordAndRedirect(passwordHash);
      this.passwordControl.setValue('');
    }
  }

  private checkPasswordAndRedirect(passwordHash: string) {
    this.passwordLoading = true;
    this.authService.submitPassword(passwordHash).subscribe((r: any) => {
      const isAuth = r.body;
      if (isAuth) localStorage.setItem(AUTHORIZED_KEY, 't');
      else localStorage.removeItem(AUTHORIZED_KEY);

      if (isAuth) {
        this.router.navigate(['/portfolio']);
        // location.reload();
      } else {
        setTimeout(() => {
          this.passwordLoading = false;
          this.router.navigate(['/']);
        }, 5 * 1000);
      }
    });
  }
}
