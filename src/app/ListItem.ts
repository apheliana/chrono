import { List } from './List';

export class ListItem {
    id = 0;
    listId = 0;
    entryText = '';
    entryDate = new Date();
    // TODO Let's add URLs in the next version
    // titleURL: string; //check if its valid URL, decapitalize all add http and www if necessary 
    createdOn = new Date();
    modifiedOn = new Date();
    deletedOn: Date = null;

    list: List = null;
}
