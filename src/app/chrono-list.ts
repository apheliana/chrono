import { ChronoEntry } from './chrono-entry';

export class ChronoList {
  id = 0;
  name = '';
  createdOn = new Date();
  description: string = null;
  modifiedOn = new Date();
  deletedOn?: Date = null;
  listItems: ChronoEntry[] = [];
  numberOfEntries: number = 0;
}
