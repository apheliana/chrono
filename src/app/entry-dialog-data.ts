import { EntryDialogModel } from './entry-dialog-model';

export interface EntryDialogData {
  model: EntryDialogModel;
  viewMode: 'create' | 'update';
}
