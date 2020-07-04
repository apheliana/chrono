import { ListItem } from "./ListItem";

export class List {
    id = 0;
    name = '';
    createdOn = new Date();
    modifiedOn = new Date();
    deletedOn?: Date = null;
    listItems: ListItem[] = []; 
}
