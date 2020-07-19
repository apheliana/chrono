import { format } from 'date-fns';

export class ChronoEntry {
  id = 0;
  listId = 0;
  entryDate = new Date();
  createdOn = new Date();
  modifiedOn = new Date();
  deletedOn: Date = null;
  // TODO This can't be used at the moment, since it throws a "cyclic dependency" error on "save to local storage"
  // list: ChronoList = null;

  get entryTitle(): string {
    return this._entryTitle;
  }
  set entryTitle(value: string) {
    value = (value || '').trim();
    if (value === null || value === '') {
      throw new Error('Invalid argument');
    }

    this._entryTitle = value;
  }

  get entryDateText(): string {
    return format(this.entryDate, 'dd.MM.yyyy');
  }

  private _entryTitle = '';

  constructor(entryTitle: string) {
    this.entryTitle = entryTitle;
  }
}
