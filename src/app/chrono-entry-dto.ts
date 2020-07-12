export class ChronoEntryDto {
  id: number;
  listId: number;
  entryText: string;
  entryDate: string;
  createdOn: string;
  modifiedOn: string;
  deletedOn?: string;
}
