export class ChronoEntryDto {
  id: number;
  listId: number;
  entryTitle: string;
  entryDate: string;
  createdOn: string;
  modifiedOn: string;
  deletedOn?: string;
}
