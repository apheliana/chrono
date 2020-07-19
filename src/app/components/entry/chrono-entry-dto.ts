export class ChronoEntryDto {
  id: number;
  listId: number;
  _entryTitle: string;
  _entryDate: string;
  createdOn: string;
  modifiedOn: string;
  deletedOn?: string;
}
