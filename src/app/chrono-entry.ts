import { format } from 'date-fns';
import { ChronoList } from './chrono-list';

export class ChronoEntry {
  id = 0;
  listId = 0;
  entryText = '';
  entryDate = new Date();
  get entryDateText(): string {
    return format(this.entryDate, 'dd.MM.yyyy');
  }
  // TODO Let's add URLs in the next version
  // titleURL: string; //check if its valid URL, decapitalize all add http and www if necessary
  createdOn = new Date();
  modifiedOn = new Date();
  deletedOn: Date = null;

  list: ChronoList = null;
}
