import type { Meta, StoryObj } from '@storybook/angular'

import { AltPagination } from '~ng/ui/pagination'
import altCorePaginationStoryMeta from '~core/ui/pagination/stories/Pagination.stories'

/**
 * Angular wrapper for Core Pagination
 */
const meta: Meta<AltPagination> = {
  title: '⚠️ Pagination',
  id: 'pagination',
  parameters: { controls: { sort: 'alpha' } },
  component: AltPagination,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltPagination
        [page]="page"
        [itemsPerPage]="itemsPerPage"
        [total]="total"
        [disabled]="disabled"
        (changePage)="onChangePage($event)"
      >
      </AltPagination>`,
  }),
  argTypes: { ...altCorePaginationStoryMeta.argTypes },
  args: { ...altCorePaginationStoryMeta.args },
} satisfies Meta<AltPagination>

export default meta
type Story = StoryObj<AltPagination>

export const Playground: Story = { args: {} }
