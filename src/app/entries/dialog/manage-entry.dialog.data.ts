import { ManageEntryDialogModel } from './manage-entry.dialog.model';

export interface ManageEntryDialogData {
  model: ManageEntryDialogModel;
  viewMode: 'create' | 'update';
}
