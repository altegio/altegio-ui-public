import type { Meta, StoryObj } from '@storybook/angular'

import { AltLabel } from '~ng/ui/label'
import altCoreLabelStoryMeta from '~core/ui/label/stories/Label.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TAltNgLabelStoryMeta = AltLabel & {
  isLongText?: boolean
}

/**
 * Angular wrapper for Core Label
 */
const meta: Meta<TAltNgLabelStoryMeta> = {
  title: 'Inputs/Partials/🔍 Label',
  id: 'label',
  parameters: { controls: { sort: 'alpha' } },
  component: AltLabel,
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
      <AltLabel 
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
      </AltLabel>
    `,
  }),
  argTypes: { ...altCoreLabelStoryMeta.argTypes },
  args: { ...altCoreLabelStoryMeta.args },
} satisfies Meta<TAltNgLabelStoryMeta>

export default meta
type Story = StoryObj<AltLabel>

export const Playground: Story = { args: {} }
