import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ENABLE_PASSWORD_PROTECTION_FLAG } from 'src/app/shared/flags.const';
import { AUTHORIZED_KEY } from 'src/app/shared/functions/cache-functions';

@Component({
  selector: 'app-base-page',
  template: ``,
})
export class BasePageComponent implements OnInit {
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const isBasePage = this._activatedRoute.snapshot.url.toString() === '';

    if (ENABLE_PASSWORD_PROTECTION_FLAG) {
      const userIsAuth = localStorage.getItem(AUTHORIZED_KEY) === 't';
      if (!userIsAuth && !isBasePage)
      this._router.navigate(['/']);
    } else if (isBasePage) {
      this._router.navigate(['portfolio']);
    }
  }
}
