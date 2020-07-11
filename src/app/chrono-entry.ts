import { format } from 'date-fns';

export class ChronoEntry {
  id = 0;
  listId = 0;
  entryText = '';
  entryDate = new Date();
  createdOn = new Date();
  modifiedOn = new Date();
  deletedOn: Date = null;
  // TODO This can't be used at the moment, since it throws a "cyclic dependency" error on "save to local storage"
  // list: ChronoList = null;

  get entryDateText(): string {
    return format(this.entryDate, 'dd.MM.yyyy');
  }
}
