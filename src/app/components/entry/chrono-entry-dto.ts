export class ChronoEntryDto {
  id: number;
  listId: number;
  _entryTitle: string;
  _entryDate: Date;
  createdOn: string;
  modifiedOn: string;
  deletedOn?: string;
}
