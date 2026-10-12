import type { Meta, StoryObj } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { EYCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { yMagic } from '~shared/icons'
import yCardButtonStoryMeta from '~core/ui/cardButton/stories/CardButton.stories'
import { YCardButton } from '~ng/ui/cardButton'
import { YCardIcon } from '~ng/ui/cardIcon'
import { action } from '@storybook/addon-actions'
import {
  type YNgCardButtonFocusEvent,
  type YNgCardButtonBlurEvent,
} from '~ng/ui/cardButton/models/types'

/**
 * Angular wrapper for CardButton
 */
const meta: Meta<YCardButton> = {
  title: 'Cards/✅ CardButton',
  id: 'cardButton',
  parameters: { controls: { sort: 'alpha' } },
  component: YCardButton,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const handlers = {
      onClickEmit: (event: Event) => {
        action('click')(event)
      },
      onFocusEmit: (event: YNgCardButtonFocusEvent) => {
        action('blur')(event)
      },
      onBlurEmit: (event: YNgCardButtonBlurEvent) => {
        action('focus')(event)
      },
    }

    return {
      props: {
        ...args,
        ...handlers,
        yMagic,
        EYCoreColorIconVariant,
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          YCardIcon,
        ],
      },
      template: `
        <YCardButton
          [annotation]="annotation"
          [disabled]="disabled"
          [hoverable]="hoverable"
          [focusable]="focusable"
          [size]="size"
          [headerText]="headerText"
          [tagText]="tagText"
          [tagVariant]="tagVariant"
          [headerIcon]="headerIcon"
          (click)="onClickEmit($event)"
          (focus)="onFocusEmit($event)"
          (blur)="onBlurEmit($event)"
        >
          @if (showCardIcon) {
            <YCardIcon
              [icon]="yMagic"
              [variant]="EYCoreColorIconVariant.GREY"
              card-button-before
            ></YCardIcon>
          }

          <div card-button-annotation>
            {{annotation}}
          </div>
        </YCardButton>`,
    }
  },
  argTypes: { ...yCardButtonStoryMeta.argTypes },
  args: { ...yCardButtonStoryMeta.args },
} satisfies Meta<YCardButton>

export default meta
type Story = StoryObj<YCardButton>

export const Playground: Story = { args: {} }
