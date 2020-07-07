import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChronoList } from './chrono-list';
import { DialogData } from './DialogData';
import { ListService } from './list.service';

@Component({
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage {
  listName: string = '';
  listDescription: string = '';
  selectedList: ChronoList = null;

  get lists(): ChronoList[] {
    return this.listService.lists;
  }

  constructor(private listService: ListService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateNewListDialog, {
      width: '250px',
      data: { listName: this.listName, listDescription: this.listDescription },
    });

    dialogRef.afterClosed().subscribe((data) => console.log(data));
  }
}

@Component({
  selector: 'create-new-list-dialog',
  templateUrl: 'create-new-list-dialog.html',
})
export class CreateNewListDialog {
  listName: string = '';
  listDescription: string = '';
  selectedList: ChronoList = null;

  constructor(
    private listService: ListService,
    public dialogRef: MatDialogRef<CreateNewListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  createList(): void {
    this.listService.createList(this.listName, this.listDescription).subscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
