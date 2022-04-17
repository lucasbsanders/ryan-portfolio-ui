import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CollectionGroup } from '../shared/models/CollectionGroup';
import { exampleCollectionList } from '../shared/localData/TestData';
import { Guid } from 'guid-typescript';
import { DisplayItem } from '../shared/models/DisplayItem';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {

  private _collections: CollectionGroup[] = [];

  constructor() {
    this._collections = exampleCollectionList;
    if (environment.production) {
      // Get collections from HTTP
    }
  }

  public getCollectionByName(collectionName: string): CollectionGroup {
    return <CollectionGroup>(
      this._collections.find(
        (collection) => collection.title.localeCompare(collectionName) === 0
      )
    );
  }

  public getItemById(itemId: Guid): DisplayItem {
    let returnItem = new DisplayItem();
    this._collections.forEach((collection) => {
      const foundItem = collection.displayItems.find(displayItem => displayItem.id.equals(itemId));
      if (foundItem) returnItem = foundItem;
    });
    return returnItem;
  }

  public getAllCollectionNames(): string[] {
    return this._collections.map((collection) => collection.title);
  }
}
