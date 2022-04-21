import { Injectable } from '@angular/core';
import { ILocationLink } from '../shared/models/LocationLink';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public locations: ILocationLink[] = [];
  public isSticky: boolean = true;

  public get endLink(): string {
    const arrLength = this.locations.length;
    if (arrLength < 1) return '';
    return this.locations[arrLength - 1].link ? <string>this.locations[arrLength - 1].link : '';
  }

  constructor() { }

}
