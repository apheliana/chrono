export class ChronoEntryDto {
  _id: number;
  _listId: number;
  _entryTitle: string;
  _entryDate: string;
  createdOn: string;
  modifiedOn: string;
  deletedOn?: string;
}
