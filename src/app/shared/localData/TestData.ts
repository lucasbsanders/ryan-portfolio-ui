import { Guid } from "guid-typescript";
import { CollectionGroup } from "../../models/CollectionGroup";
import { DisplayItem, ItemType } from "../../models/DisplayItem";

export const exampleDisplayItemList: DisplayItem[] = [
  <DisplayItem>{
    id: Guid.parse("1f008265-0060-90c2-9886-db413743450c"),
    url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/359cf213-96fb-4fa5-9bc1-30b3f5252ca0/d806iij-1c6c114b-6f99-45b9-810f-70888122cb81.png/v1/fill/w_775,h_1031,q_75,strp/bold_and_brash_by_berni11-d806iij.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi8zNTljZjIxMy05NmZiLTRmYTUtOWJjMS0zMGIzZjUyNTJjYTAvZDgwNmlpai0xYzZjMTE0Yi02Zjk5LTQ1YjktODEwZi03MDg4ODEyMmNiODEucG5nIiwid2lkdGgiOiI8PTc3NSIsImhlaWdodCI6Ijw9MTAzMSJ9XV19.xzd69wd3RDzkXh3lju6m5lhdl2AFQnZgzrEhzJ1IJ8Y',
    title: 'Bold and Brash',
    author: 'Squidward Tentacles',
    type: ItemType.Image,
    comments: ['More like, belongs in the trash'],
  },
  <DisplayItem>{
    id: Guid.parse("addf3a8e-ff67-6e41-9bab-2df8132afddf"),
    url: 'https://www.picamon.com/wp-content/uploads/2020/10/Picamon-northern-lights-0-5f8b42955e1ad',
    title: 'Wallpaper Design',
    type: ItemType.Image,
  },
  
  <DisplayItem>{
    id: Guid.parse("8e2e352e-6dfb-96e0-d2b7-0ed7557ac99d"),
    url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.equestrianempire.com%2Fwp-content%2Fuploads%2F2015%2F04%2Fhorseshark.jpg&f=1&nofb=1',
    title: 'Horse Shark',
    author: 'Who Even Knows',
    type: ItemType.Image,
    comments: [],
  },
  <DisplayItem>{
    id: Guid.parse("fc479543-3c58-4454-f880-08dfd2f39d3c"),
    url: 'http://www.themarysue.com/wp-content/uploads/2016/04/matrix.jpg',
    title: 'Matrix Promotional Poster',
    type: ItemType.Image,
  },
  <DisplayItem>{
    id: Guid.parse("c0059b29-1327-0d4d-346e-53a5011b154a"),
    url: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgetwallpapers.com%2Fwallpaper%2Ffull%2Fa%2Fb%2F1%2F395329.jpg&f=1&nofb=1',
    title: 'Freeform Jazz',
    type: ItemType.Image,
  },
  <DisplayItem>{
    id: Guid.parse("2994d115-cf4a-88b2-a707-7e3b43892688"),
    url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/359cf213-96fb-4fa5-9bc1-30b3f5252ca0/d806iij-1c6c114b-6f99-45b9-810f-70888122cb81.png/v1/fill/w_775,h_1031,q_75,strp/bold_and_brash_by_berni11-d806iij.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi8zNTljZjIxMy05NmZiLTRmYTUtOWJjMS0zMGIzZjUyNTJjYTAvZDgwNmlpai0xYzZjMTE0Yi02Zjk5LTQ1YjktODEwZi03MDg4ODEyMmNiODEucG5nIiwid2lkdGgiOiI8PTc3NSIsImhlaWdodCI6Ijw9MTAzMSJ9XV19.xzd69wd3RDzkXh3lju6m5lhdl2AFQnZgzrEhzJ1IJ8Y',
    title: 'Squiddy\'s Painting Thing',
    type: ItemType.Image,
  },
];

export const exampleCollectionList: CollectionGroup[] = [
  <CollectionGroup>{
    id: Guid.parse("abce9136-1ce0-e9ca-b192-269fe6f789c1"),
    title: 'Instagram Illustrations',
    displayItems: exampleDisplayItemList,
  },
  <CollectionGroup>{
    id: Guid.parse("4fda8de2-0119-4a3d-0788-caa5dcd11951"),
    title: 'Animations',
    displayItems: exampleDisplayItemList,
  },
  <CollectionGroup>{
    id: Guid.parse("e7ab69da-a6b7-83d7-ffb2-da50c2ab7534"),
    title: 'Caricatures',
    displayItems: exampleDisplayItemList,
  },
];
