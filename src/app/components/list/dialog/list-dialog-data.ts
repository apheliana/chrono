import { ListDialogModel } from './list-dialog-model';

export interface ListDialogData {
  model: ListDialogModel;
  viewMode: 'create' | 'update';
}
