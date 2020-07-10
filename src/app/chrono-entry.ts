import { format } from 'date-fns';
import { ChronoList } from './chrono-list';

export class ChronoEntry {
  id = 0;
  listId = 0;
  entryText = '';
  entryDate = new Date();
  createdOn = new Date();
  modifiedOn = new Date();
  deletedOn: Date = null;
  list: ChronoList = null;

  get entryDateText(): string {
    return format(this.entryDate, 'dd.MM.yyyy');
  }
}
