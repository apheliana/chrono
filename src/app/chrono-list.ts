import { ChronoEntry } from './chrono-entry';

export class ChronoList {
  createdOn = new Date();
  modifiedOn = new Date();
  deletedOn?: Date = null;
  listItems: ChronoEntry[] = [];

  get description(): string {
    return this._description;
  }
  set description(value: string) {
    value = (value || '').trim();
    if (value === '') {
      value = null;
    }

    this._description = value;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    value = (value || '').trim();
    if (value === null || value === '') {
      throw new Error('Invalid argument');
    }

    this._name = value;
  }

  private _description = '';
  private _name = '';

  constructor(public id: number, nameInput: string, descriptionInput: string) {
    this.name = nameInput;
    this.description = descriptionInput;
  }
}
