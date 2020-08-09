import { moduleMetadata } from '@storybook/angular';
import { NotFoundPage } from './not-found.page';
import { NotFoundPageModule } from './not-found.page.module';

export default {
  title: '2-Components/Not found',
  component: NotFoundPage,
  decorators: [
    moduleMetadata({
      imports: [NotFoundPageModule],
    }),
  ],
};

export const Default = () => ({
  component: NotFoundPage,
});
