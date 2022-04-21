import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CollectionGroup } from '../shared/models/CollectionGroup';
import { exampleCollectionList } from '../shared/localData/TestData';
import { Guid } from 'guid-typescript';
import { DisplayItem } from '../shared/models/DisplayItem';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {

  private _collections: CollectionGroup[] = [];

  constructor() {
    this._collections = exampleCollectionList;
    if (environment.production) {
      this.getCollectionsFromHttp();
    }
  }

  public getCollectionsFromHttp() {
    // Get collections from HTTP
  }

  public getCollectionByName(collectionName: string): Observable<CollectionGroup> {
    return of(<CollectionGroup>(
      this._collections.find(
        (collection) => collection.title.localeCompare(collectionName) === 0
      )
    ));
  }

  public getItemById(itemId: Guid): Observable<DisplayItem> {
    let returnItem: DisplayItem = <DisplayItem>{};
    this._collections.forEach((collection) => {
      const foundItem = collection.displayItems.find(displayItem => displayItem.id.equals(itemId));
      if (foundItem) returnItem = foundItem;
    });
    return of(returnItem);
  }

  public getAllCollections(): Observable<CollectionGroup[]> {
    return of(this._collections);
  }
}
