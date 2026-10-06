import type { Meta, StoryObj } from '@storybook/angular'

import { YLabel } from '~ng/ui/label'
import yCoreLabelStoryMeta from '~core/ui/label/stories/Label.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TYNgLabelStoryMeta = YLabel & {
  isLongText?: boolean
}

/**
 * Angular-обертка над Core Label
 */
const meta: Meta<TYNgLabelStoryMeta> = {
  title: 'Inputs/Partials/🔍 Label',
  id: 'label',
  parameters: { controls: { sort: 'alpha' } },
  component: YLabel,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: {
      ...args,
      computedText: args.isLongText ? LOREM_IPSUM : args.text,
    },
    template: `
      <YLabel 
        [disabled]="disabled" 
        [required]="required" 
        [text]="computedText" 
        [tooltipText]="tooltipText"
        [tooltipActive]="tooltipActive"
        [tooltipPlacement]="tooltipPlacement"
      >
        <ng-template #tooltipContent>
          {{ tooltipContentSlot }}
        </ng-template>
      </YLabel>
    `,
  }),
  argTypes: { ...yCoreLabelStoryMeta.argTypes },
  args: { ...yCoreLabelStoryMeta.args },
} satisfies Meta<TYNgLabelStoryMeta>

export default meta
type Story = StoryObj<YLabel>

export const Playground: Story = { args: {} }
