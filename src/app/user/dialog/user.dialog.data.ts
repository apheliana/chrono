import { UserDialogModel } from './user.dialog.model';

export interface UserDialogData {
  model: UserDialogModel;
  viewMode: 'create' | 'update';
}
