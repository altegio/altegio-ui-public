import type { Meta, StoryObj } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { EAltCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { altMagic } from '~shared/icons'
import altCardButtonStoryMeta from '~core/ui/cardButton/stories/CardButton.stories'
import { AltCardButton } from '~ng/ui/cardButton'
import { AltCardIcon } from '~ng/ui/cardIcon'
import { action } from 'storybook/actions'
import {
  type AltNgCardButtonFocusEvent,
  type AltNgCardButtonBlurEvent,
} from '~ng/ui/cardButton/models/types'

/**
 * Angular wrapper for CardButton
 */
const meta: Meta<AltCardButton> = {
  title: 'Cards/✅ CardButton',
  id: 'cardButton',
  parameters: { controls: { sort: 'alpha' } },
  component: AltCardButton,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const handlers = {
      onClickEmit: (event: Event) => {
        action('click')(event)
      },
      onFocusEmit: (event: AltNgCardButtonFocusEvent) => {
        action('blur')(event)
      },
      onBlurEmit: (event: AltNgCardButtonBlurEvent) => {
        action('focus')(event)
      },
    }

    return {
      props: {
        ...args,
        ...handlers,
        altMagic,
        EAltCoreColorIconVariant,
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          AltCardIcon,
        ],
      },
      template: `
        <AltCardButton
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
            <AltCardIcon
              [icon]="altMagic"
              [variant]="EAltCoreColorIconVariant.GREY"
              card-button-before
            ></AltCardIcon>
          }

          <div card-button-annotation>
            {{annotation}}
          </div>
        </AltCardButton>`,
    }
  },
  argTypes: { ...altCardButtonStoryMeta.argTypes },
  args: { ...altCardButtonStoryMeta.args },
} satisfies Meta<AltCardButton>

export default meta
type Story = StoryObj<AltCardButton>

export const Playground: Story = { args: {} }
