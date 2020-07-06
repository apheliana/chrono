import { ChronoEntry } from './chrono-entry';

export class ChronoList {
  id = 0;
  name = '';
  createdOn = new Date();
  description = '';
  modifiedOn = new Date();
  deletedOn?: Date = null;
  listItems: ChronoEntry[] = [];
}
