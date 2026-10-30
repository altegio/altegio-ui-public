// TODO: Slots are not supported in this story yet

import type { Meta, StoryObj } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import altCoreCardSelectStoryMeta from '~core/ui/cardSelect/stories/CardSelect.stories'
import { EAltCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { altMagic } from '~shared/icons'
import { AltCardSelect } from '~ng/ui/cardSelect'
import { AltCardIcon } from '~ng/ui/cardIcon'
import { AltCardCheckbox } from '~ng/ui/cardCheckbox'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import {
  type AltNgCardSelectFocusEvent,
  type AltNgCardSelectBlurEvent,
} from '~ng/ui/cardSelect/models/types'

/**
 * Angular wrapper for CardSelect
 */
const meta: Meta<AltCardSelect> = {
  title: 'Cards/✅ CardSelect',
  id: 'cardSelect',
  parameters: { controls: { sort: 'alpha' } },
  component: AltCardSelect,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onFocusEmit: (event: AltNgCardSelectFocusEvent) => {
        action('blur')(event)
      },
      onBlurEmit: (event: AltNgCardSelectBlurEvent) => {
        action('focus')(event)
      },
      onClickEmit: (event: Event) => {
        action('click')(event)
        updateArgs({ checked: !args.checked })
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
          AltCardCheckbox,
        ],
      },
      template: `
      <AltCardSelect
        [annotation]="annotation"
        [checked]="checked"
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
            card-select-before
          ></AltCardIcon>
        }
        
        @if (showCardCheckbox) {
          <AltCardCheckbox 
            (clickEvent)="onClickEmit($event)"
            card-select-after
          />
        }

        <div card-select-annotation>
          {{annotation}}
        </div>
      </AltCardSelect>`,
    }
  },
  argTypes: { ...altCoreCardSelectStoryMeta.argTypes },
  args: { ...altCoreCardSelectStoryMeta.args },
} satisfies Meta<AltCardSelect>

export default meta
type Story = StoryObj<AltCardSelect>

export const Playground: Story = { args: {} }
