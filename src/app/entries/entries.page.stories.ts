import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata } from '@storybook/angular';
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
      declarations: [BlankComponent],
      imports: [RouterTestingModule.withRoutes([{ path: 'not-found', component: BlankComponent }]), EntriesPageModule],
    }),
  ],
};

export const Default = () => ({
  component: EntriesPage,
});
