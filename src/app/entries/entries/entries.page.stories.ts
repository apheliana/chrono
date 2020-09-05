import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ManageListDialog } from 'src/app/lists/manage-list/manage-list.dialog';
import { ChronoEntry } from 'src/app/models/chrono-entry';
import { ChronoList } from 'src/app/models/chrono-list';
import { ManageEntryDialog } from '../manage-entry/manage-entry.dialog';
import { EntriesPage } from './entries.page';
import { EntriesPageModule } from './entries.page.module';

@Component({
  template: '',
})
class BlankComponent {}

export default {
  title: '2-Components/Entries page',
  component: EntriesPage,
  decorators: [
    moduleMetadata({
      entryComponents: [ManageEntryDialog, ManageListDialog],
      declarations: [BlankComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([{ path: 'not-found', component: BlankComponent }]),
        EntriesPageModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                'user-name': 'user',
                'list-id': 1,
              },
            },
          },
        },
        {
          // TODO Don't override appService but load the data from mock server
          provide: AppService,
          useValue: {
            createEntry: () => of(null),
            // TODO 👇
            getListByUserName: () => {
              const list = new ChronoList(1, 1, 'List', 'Description');
              list.listItems.push(new ChronoEntry(1, 1, 'title A', new Date()));
              return list;
            },
            save: () => of(null),
          },
        },
      ],
    }),
  ],
};

export const Default = () => ({
  component: EntriesPage,
});
