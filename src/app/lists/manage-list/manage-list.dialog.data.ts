import { ManageListDialogModel } from './manage-list.dialog.model';

export interface ManageListDialogData {
  model: ManageListDialogModel;
  viewMode: 'create' | 'update';
}
