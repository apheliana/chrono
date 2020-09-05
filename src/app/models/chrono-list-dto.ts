import { ChronoEntryDto } from '../models/chrono-entry-dto';

export interface ChronoListDto {
  name: string;
  description: string;
  id: number;
  userId: number;
  createdOn: string;
  modifiedOn: string;
  deletedOn?: string;
  listItems: ChronoEntryDto[];
}
