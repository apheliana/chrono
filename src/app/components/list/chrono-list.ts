import { ChronoEntry } from '../entry/chrono-entry';

export class ChronoList {
  createdOn = new Date();
  modifiedOn = new Date();
  deletedOn?: Date = null;
  listItems: ChronoEntry[] = [];

  get description(): string {
    return this._description;
  }
  set description(value) {
    value = (value || '').trim();
    if (value === '') {
      value = null;
    }

    this._description = value;
  }

  get id(): number {
    return this._id;
  }
  set id(value) {
    if (typeof value === 'undefined' || value === null) {
      throw new Error('Invalid argument');
    }

    this._id = value;
  }

  get name(): string {
    return this._name;
  }
  set name(value) {
    value = (value || '').trim();
    if (value === null || value === '') {
      throw new Error('Invalid argument');
    }

    this._name = value;
  }

  private _description = '';
  private _id = 0;
  private _name = '';

  constructor(id: number, name: string, description: string = null) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
