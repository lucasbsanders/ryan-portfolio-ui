import { Injectable } from '@angular/core';
import { ILocationLink } from '../shared/models/LocationLink';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public locations: ILocationLink[] = [];
  private _menuOpen: boolean = true;

  public get menuOpen(): boolean {
    return this._menuOpen;
  }

  public set menuOpen(isOpen: boolean) {
    if (isOpen) document.getElementById('navbar')?.classList.add("sticky-top");
    this._menuOpen = isOpen;
  }

  public get endLink(): string {
    const arrLength = this.locations.length;
    if (arrLength < 1) return '';
    return this.locations[arrLength - 1].link ? <string>this.locations[arrLength - 1].link : '';
  }

  constructor() { }

}
