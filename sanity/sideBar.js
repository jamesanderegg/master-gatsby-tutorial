import React from 'react';
import s from '@sanity/desk-tool/structure-builder';

// build a custom sidebar

export default function SideBar() {
  return s
    .list()
    .title(`Slick's Slices`)
    .items([
      // create a new sub item
      s
        .listItem()
        .title('Home Page')
        .icon(() => <strong>&#x1F9A9;</strong>)
        .child(
          s
            .editor()
            .schemaType('storeSettings')
            // make a new doc id so we dont have random string of numbers
            .documentId('downtown')
        ),
      // add in the rest of our doc items
      ...s
        .documentTypeListItems()
        .filter((item) => item.getId() !== 'storeSettings'),
    ]);
}
