import type { Meta, StoryObj } from '@storybook/angular'
import { AltRating } from '~ng/ui/rating'
import altCoreRatingStoryMeta from '~core/ui/rating/stories/Rating.stories'

/**
 * Angular wrapper for Core Rating. Works with `[(value)]`, `ngModel` and `formControl`.
 */
const meta: Meta<AltRating> = {
  title: '✅ Rating',
  id: 'rating',
  parameters: { controls: { sort: 'alpha' } },
  component: AltRating,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltRating
        [(value)]="value"
        [max]="max"
        [readonly]="readonly"
        [disabled]="disabled"
        [required]="required"
        [size]="size"
        [accessibleName]="accessibleName"
      ></AltRating>
    `,
  }),
  argTypes: altCoreRatingStoryMeta.argTypes,
  args: altCoreRatingStoryMeta.args,
}

export default meta
type Story = StoryObj<AltRating>

export const Playground: Story = { args: {} }
