import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';
import { AppService } from '../app.service';
import { ChronoEntry } from '../models/chrono-entry';
import { ChronoList } from '../models/chrono-list';
import { EntriesPage } from './entries.page';
import { EntriesPageModule } from './entries.page.module';
import { ManageEntryDialog } from './manage-entry/manage-entry.dialog';

@Component({
  template: '',
})
class BlankComponent {}

export default {
  title: '2-Components/Entries page',
  component: EntriesPage,
  decorators: [
    moduleMetadata({
      entryComponents: [ManageEntryDialog],
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
