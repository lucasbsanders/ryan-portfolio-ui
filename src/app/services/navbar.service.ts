import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private _menuOpen: boolean = false;

  public get menuOpen(): boolean {
    return this._menuOpen;
  }

  public set menuOpen(isOpen: boolean) {
    if (isOpen) {
      document.getElementById('navbar-parent')?.classList.add("sticky-top");
    }
    else {
      document.getElementById('navbar-parent')?.classList.remove("sticky-top");
    }
    document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
    this._menuOpen = isOpen;
  }

  constructor() { }


}
