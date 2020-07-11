import { ChronoEntry } from './chrono-entry';

export interface ChronoListDto {
  _name: string;
  _description: string;
  id: number;
  createdOn: Date;
  modifiedOn: Date;
  deletedOn?: Date;
  listItems: ChronoEntry[];
}
