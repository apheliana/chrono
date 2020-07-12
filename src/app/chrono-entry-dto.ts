export class ChronoEntryDto {
  id: number;
  listId: number;
  _entryTitle: string;
  entryDate: string;
  createdOn: string;
  modifiedOn: string;
  deletedOn?: string;
}
