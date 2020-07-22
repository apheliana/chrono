import { ChronoEntryDto } from '../entry/chrono-entry-dto';

export interface ChronoListDto {
  _name: string;
  _description: string;
  _id: number;
  createdOn: string;
  modifiedOn: string;
  deletedOn?: string;
  listItems: ChronoEntryDto[];
}
