import { html, nothing } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from '@storybook/preview-api'

import {
  createCoreCardSelectProps,
  type IYCoreCardSelectProps,
  type TYCoreCardSelectEvents,
} from '~core/ui/cardSelect/models/types'
import { YCoreCardSelectTagName as tagName } from '~shared/constants'

import { getComponentContentTable, storyControlsTable } from '~shared/.storybook/tables'

import { EYCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { yMagic } from '~shared/icons'

import yCoreCardWrapperStoryMeta from '~core/ui/cardWrapper/stories/CardWrapper.stories'
import yCoreCardHeaderStoryMeta from '~core/ui/cardHeader/stories/CardHeader.stories'

import '~core/ui/cardSelect'
import '~core/ui/cardIcon'
import '~core/ui/cardCheckbox'

const { annotation } = createCoreCardSelectProps()

export interface IYCoreCardSelectStorySlots {
  showCardIcon: boolean
  showCardCheckbox: boolean
}

type TYCoreCardSelectMeta = Meta<IYCoreCardSelectProps & IYCoreCardSelectStorySlots & Pick<TYCoreCardSelectEvents, 'onBlur' | 'onFocus'> & {
  onClick: (event: Event) => void
  hasAnnotationSlot: boolean
}>

/**
 * ## Core CardSelect
 */
const meta: TYCoreCardSelectMeta = {
  title: 'Cards/✅ CardSelect',
  id: 'cardSelect',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    hoverable,
    focusable,
    size,
    headerText,
    tagText,
    tagVariant,
    headerIcon,
    annotation,
    showCardIcon,
    showCardCheckbox,
    hasAnnotationSlot,
    onClick,
    onBlur,
    onFocus,
  }) => {
    const [
      args,
      updateArgs,
    ] = useArgs<IYCoreCardSelectProps>()

    const { checked } = args
    const handleOnClick = (event: Event) => {
      onClick(event)

      if (showCardCheckbox) {
        updateArgs({ ...args, checked: !checked })
        return
      }

      updateArgs({ ...args, checked: true })
    }

    const onChecked = () => {
      updateArgs({ ...args, checked: !checked })
    }

    return html`
      <y-core-card-select
        .checked=${checked}
        .disabled=${disabled}
        .hoverable=${hoverable}
        .focusable=${focusable}
        .size=${size}
        .headerText=${headerText}
        .tagText=${tagText}
        .tagVariant=${tagVariant}
        .headerIcon=${headerIcon}
        .annotation=${annotation}
        @click=${handleOnClick}
        @blur=${onBlur}
        @focus=${onFocus}
      >
        ${showCardIcon
          ? html`
              <y-core-card-icon
                .icon=${yMagic}
                .variant=${EYCoreColorIconVariant.GREY}
                slot="before"
              >
              </y-core-card-icon>
            `
          : nothing
        }

        ${showCardCheckbox
          ? html`
            <y-core-card-checkbox
              slot="after"
              @checked=${onChecked}
            ></y-core-card-checkbox>`
          : nothing
        }

        ${hasAnnotationSlot
          ? html`<span slot="annotation">Slot for annotation text</span>`
          : nothing
        }
      </y-core-card-select>
    `
  },
  argTypes: {
    ...pick(yCoreCardWrapperStoryMeta.argTypes ?? {}, ['checked', 'disabled', 'hoverable', 'focusable', 'size']),
    ...pick(yCoreCardHeaderStoryMeta.argTypes ?? {}, ['headerText', 'tagText', 'tagVariant', 'headerIcon']),

    // Story Controls
    annotation: {
      type: 'string',
      description: 'Supporting text below the heading',
      ...getComponentContentTable(annotation),
    },
    hasAnnotationSlot: {
      type: 'boolean',
      description: 'Show the annotation slot',
      ...storyControlsTable,
    },
    ...pick(yCoreCardWrapperStoryMeta.argTypes ?? {}, ['showCardIcon', 'showCardCheckbox']),

    // Component Events
    ...pick(yCoreCardWrapperStoryMeta.argTypes ?? {}, ['onClick', 'onBlur', 'onFocus']),
  },
  args: {
    ...pick(yCoreCardWrapperStoryMeta.args ?? {}, ['checked', 'disabled', 'hoverable', 'focusable', 'size', 'showCardIcon', 'showCardCheckbox', 'onClick', 'onBlur', 'onFocus']),
    ...pick(yCoreCardHeaderStoryMeta.args ?? {}, ['headerText', 'tagText', 'tagVariant', 'headerIcon']),
    annotation: 'Annotation',
    hasAnnotationSlot: false,
  },
} satisfies TYCoreCardSelectMeta

export default meta
type Story = StoryObj<IYCoreCardSelectProps>

export const Playground: Story = { args: {} }
