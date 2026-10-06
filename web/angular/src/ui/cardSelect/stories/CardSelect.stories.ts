// TODO: PFW-1080 - не получилось реализовать слоты

import type { Meta, StoryObj } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import yCoreCardSelectStoryMeta from '~core/ui/cardSelect/stories/CardSelect.stories'
import { EYCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { yMagic } from '~shared/icons'
import { YCardSelect } from '~ng/ui/cardSelect'
import { YCardIcon } from '~ng/ui/cardIcon'
import { YCardCheckbox } from '~ng/ui/cardCheckbox'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import {
  type YNgCardSelectFocusEvent,
  type YNgCardSelectBlurEvent,
} from '~ng/ui/cardSelect/models/types'

/**
 * Angular wrapper for CardSelect
 */
const meta: Meta<YCardSelect> = {
  title: 'Cards/✅ CardSelect',
  id: 'cardSelect',
  parameters: { controls: { sort: 'alpha' } },
  component: YCardSelect,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    const handlers = {
      onFocusEmit: (event: YNgCardSelectFocusEvent) => {
        action('blur')(event)
      },
      onBlurEmit: (event: YNgCardSelectBlurEvent) => {
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
        yMagic,
        EYCoreColorIconVariant,
      },
      moduleMetadata: {
        imports: [
          CommonModule,
          YCardIcon,
          YCardCheckbox,
        ],
      },
      template: `
      <YCardSelect
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
          <YCardIcon
            [icon]="yMagic"
            [variant]="EYCoreColorIconVariant.GREY"
            card-select-before
          ></YCardIcon>
        }
        
        @if (showCardCheckbox) {
          <YCardCheckbox 
            (clickEvent)="onClickEmit($event)"
            card-select-after
          />
        }

        <div card-select-annotation>
          {{annotation}}
        </div>
      </YCardSelect>`,
    }
  },
  argTypes: { ...yCoreCardSelectStoryMeta.argTypes },
  args: { ...yCoreCardSelectStoryMeta.args },
} satisfies Meta<YCardSelect>

export default meta
type Story = StoryObj<YCardSelect>

export const Playground: Story = { args: {} }
