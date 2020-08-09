import { format } from 'date-fns';

export class ChronoEntry {
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

  get entryDate(): Date {
    return this._entryDate;
  }
  set entryDate(value: Date) {
    if (typeof value === 'undefined' || value === null) {
      throw new Error('Invalid argument');
    }

    if (value > new Date()) {
      throw new Error('Invalid argument');
    }

    this._entryDate = value;
  }

  get entryDateText(): string {
    return format(this.entryDate, 'dd.MM.yyyy');
  }

  get listId(): number {
    return this._listId;
  }
  set listId(value) {
    if (typeof value === 'undefined' || value === null) {
      throw new Error('Invalid argument');
    }

    this._listId = value;
  }

  get id(): number {
    return this._id;
  }

  private _entryTitle = '';
  private _entryDate: Date;
  private _id = 0;
  private _listId = 0;

  constructor(id: number, listId: number, entryTitle: string, entryDate: Date) {
    if (typeof id === 'undefined' || id === null) {
      throw new Error('Invalid argument');
    }

    this._id = id;
    this.listId = listId;
    this.entryTitle = entryTitle;
    this.entryDate = entryDate;
  }
}
