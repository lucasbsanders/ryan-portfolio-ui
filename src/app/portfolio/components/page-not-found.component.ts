import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  template: `<div class="container text-center">
    <h1 class="mt-5">Error: Page Not Found</h1>
    <div class="spinner-border text-secondary mt-5" role="status">
      <span class="visually-hidden">Taking you home...</span>
    </div>
  </div>`,
})
export class PageNotFoundComponent implements OnInit {
  constructor(private _Router: Router) {}

  ngOnInit(): void {
    setTimeout(() => this._Router.navigate(['/']), 2 * 1000);
  }
}
