import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ChronoList } from './chrono-list';
import { ListDialogInput } from './list-dialog-input';
import { ListDialogOutput } from './list-dialog-output';
import { ListDialogComponent } from './list-dialog.component';
import { ListService } from './list.service';

@Component({
  templateUrl: './chrono-entry.page.html',
  styleUrls: ['./chrono-entry.page.scss'],
})
export class ChronoEntryPage implements OnInit {
  entryDate: Date = new Date();
  entryText: string = '';
  selectedList: ChronoList = null;

  constructor(private activatedRoute: ActivatedRoute, private listService: ListService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const listIdParam = this.activatedRoute.snapshot.params['list-id'];

    if (!listIdParam) {
      // TODO Handle this..
    }

    const listId = Number(listIdParam);
    this.selectedList = this.listService.getListById(listId);
  }

  createEntry(): void {
    this.listService.createEntry(this.selectedList, this.entryText, this.entryDate).subscribe();
  }

  updateListDialog(): void {
    const dialogRef = this.dialog.open<ListDialogComponent, ListDialogInput>(ListDialogComponent, {
      data: { name: this.selectedList.name, description: this.selectedList.description, viewMode: 'update' },
    });

    dialogRef.afterClosed().subscribe((data: ListDialogOutput) => {
      if (!data) {
        return;
      }

      this.listService.updateList(data.name, data.description, this.selectedList);
    });
  }

  // TODO Delete entry?
}
