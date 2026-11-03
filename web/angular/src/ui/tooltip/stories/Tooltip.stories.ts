import type { Meta, StoryObj } from '@storybook/angular'
import { AltTooltip } from '~ng/ui/tooltip'
import altCoreTooltipStoryMeta, { type IAltCoreLabelStoryProps } from '~core/ui/tooltip/stories/Tooltip.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { action } from 'storybook/actions'
import { AltSimpleButton } from '~ng/ui/simpleButton'

/**
 * Angular wrapper for Core Tooltip
 */
const meta: Meta<AltTooltip & IAltCoreLabelStoryProps> = {
  title: 'Tips/⚠️ Tooltip',
  id: 'tooltip',
  parameters: { controls: { sort: 'alpha' } },
  component: AltTooltip,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    moduleMetadata: { imports: [AltSimpleButton] },
    props: {
      ...args,
      computedText: args.isLongText ? LOREM_IPSUM : args.text,
      onClick: action('onClick'),
    },
    template: `
    <div style="padding:50px calc(50% - 100px); width: fit-content">
      <AltTooltip [text]="computedText" [disabled]="disabled" [placement]="placement">
        <div activator>
          <AltSimpleButton (click)="onClick($event)">Hover over me</AltSimpleButton>
        </div>
        
        @if (isSlotExists) {
          <div content>
            Content slot
  
            @if (isLongText) {
              <div>{{ computedText }}</div> 
            }
          </div>   
        }
      </AltTooltip>
    </div>
    `,
  }),
  argTypes: altCoreTooltipStoryMeta.argTypes,
  args: altCoreTooltipStoryMeta.args,
} satisfies Meta<AltTooltip & IAltCoreLabelStoryProps>

export default meta
type Story = StoryObj<AltTooltip & IAltCoreLabelStoryProps>

export const Playground: Story = { args: {} }
