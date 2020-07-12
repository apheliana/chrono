import { ChronoEntryDto } from './chrono-entry-dto';

export interface ChronoListDto {
  _name: string;
  _description: string;
  id: number;
  createdOn: string;
  modifiedOn: string;
  deletedOn?: string;
  listItems: ChronoEntryDto[];
}
