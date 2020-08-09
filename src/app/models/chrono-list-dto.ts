import { ChronoEntryDto } from '../models/chrono-entry-dto';

export interface ChronoListDto {
  _name: string;
  _description: string;
  _id: number;
  _userId: number;
  createdOn: string;
  modifiedOn: string;
  deletedOn?: string;
  listItems: ChronoEntryDto[];
}
