import type { Meta, StoryObj } from '@storybook/angular'

import { YPagination } from '~ng/ui/pagination'
import yCorePaginationStoryMeta from '~core/ui/pagination/stories/Pagination.stories'

/**
 * Angular-обертка над Core Pagination
 */
const meta: Meta<YPagination> = {
  title: '⚠️ Pagination',
  id: 'pagination',
  parameters: { controls: { sort: 'alpha' } },
  component: YPagination,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <YPagination
        [page]="page"
        [itemsPerPage]="itemsPerPage"
        [total]="total"
        [disabled]="disabled"
        (changePage)="onChangePage($event)"
      >
      </YPagination>`,
  }),
  argTypes: { ...yCorePaginationStoryMeta.argTypes },
  args: { ...yCorePaginationStoryMeta.args },
} satisfies Meta<YPagination>

export default meta
type Story = StoryObj<YPagination>

export const Playground: Story = { args: {} }
