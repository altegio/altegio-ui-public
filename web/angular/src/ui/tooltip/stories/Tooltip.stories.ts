import type { Meta, StoryObj } from '@storybook/angular'
import { YTooltip } from '~ng/ui/tooltip'
import yCoreTooltipStoryMeta, { type IYCoreLabelStoryProps } from '~core/ui/tooltip/stories/Tooltip.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { action } from '@storybook/addon-actions'
import { YSimpleButton } from '~ng/ui/simpleButton'

/**
 * Angular-обертка над Core Tooltip
 */
const meta: Meta<YTooltip & IYCoreLabelStoryProps> = {
  title: 'Tips/⚠️ Tooltip',
  id: 'tooltip',
  parameters: { controls: { sort: 'alpha' } },
  component: YTooltip,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    moduleMetadata: { imports: [YSimpleButton] },
    props: {
      ...args,
      computedText: args.isLongText ? LOREM_IPSUM : args.text,
      onClick: action('onClick'),
    },
    template: `
    <div style="padding:50px calc(50% - 100px); width: fit-content">
      <YTooltip [text]="computedText" [disabled]="disabled" [placement]="placement">
        <div activator>
          <YSimpleButton (click)="onClick($event)">Наведи на меня</YSimpleButton>
        </div>
        
        @if (isSlotExists) {
          <div content>
            Слот с контентом
  
            @if (isLongText) {
              <div>{{ computedText }}</div> 
            }
          </div>   
        }
      </YTooltip>
    </div>
    `,
  }),
  argTypes: yCoreTooltipStoryMeta.argTypes,
  args: yCoreTooltipStoryMeta.args,
} satisfies Meta<YTooltip & IYCoreLabelStoryProps>

export default meta
type Story = StoryObj<YTooltip & IYCoreLabelStoryProps>

export const Playground: Story = { args: {} }
