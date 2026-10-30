import { html, nothing } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from 'storybook/preview-api'

import {
  createCoreCardSelectProps,
  type IAltCoreCardSelectProps,
  type TAltCoreCardSelectEvents,
} from '~core/ui/cardSelect/models/types'
import { AltCoreCardSelectTagName as tagName } from '~shared/constants'

import { getComponentContentTable, storyControlsTable } from '~shared/.storybook/tables'

import { EAltCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { altMagic } from '~shared/icons'

import altCoreCardWrapperStoryMeta from '~core/ui/cardWrapper/stories/CardWrapper.stories'
import altCoreCardHeaderStoryMeta from '~core/ui/cardHeader/stories/CardHeader.stories'

import '~core/ui/cardSelect'
import '~core/ui/cardIcon'
import '~core/ui/cardCheckbox'

const { annotation } = createCoreCardSelectProps()

export interface IAltCoreCardSelectStorySlots {
  showCardIcon: boolean
  showCardCheckbox: boolean
}

type TAltCoreCardSelectMeta = Meta<IAltCoreCardSelectProps & IAltCoreCardSelectStorySlots & Pick<TAltCoreCardSelectEvents, 'onBlur' | 'onFocus'> & {
  onClick: (event: Event) => void
  hasAnnotationSlot: boolean
}>

/**
 * ## Core CardSelect
 */
const meta: TAltCoreCardSelectMeta = {
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
    ] = useArgs<IAltCoreCardSelectProps>()

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
      <alt-core-card-select
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
              <alt-core-card-icon
                .icon=${altMagic}
                .variant=${EAltCoreColorIconVariant.GREY}
                slot="before"
              >
              </alt-core-card-icon>
            `
          : nothing
        }

        ${showCardCheckbox
          ? html`
            <alt-core-card-checkbox
              slot="after"
              @checked=${onChecked}
            ></alt-core-card-checkbox>`
          : nothing
        }

        ${hasAnnotationSlot
          ? html`<span slot="annotation">Slot for annotation text</span>`
          : nothing
        }
      </alt-core-card-select>
    `
  },
  argTypes: {
    ...pick(altCoreCardWrapperStoryMeta.argTypes ?? {}, ['checked', 'disabled', 'hoverable', 'focusable', 'size']),
    ...pick(altCoreCardHeaderStoryMeta.argTypes ?? {}, ['headerText', 'tagText', 'tagVariant', 'headerIcon']),

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
    ...pick(altCoreCardWrapperStoryMeta.argTypes ?? {}, ['showCardIcon', 'showCardCheckbox']),

    // Component Events
    ...pick(altCoreCardWrapperStoryMeta.argTypes ?? {}, ['onClick', 'onBlur', 'onFocus']),
  },
  args: {
    ...pick(altCoreCardWrapperStoryMeta.args ?? {}, ['checked', 'disabled', 'hoverable', 'focusable', 'size', 'showCardIcon', 'showCardCheckbox', 'onClick', 'onBlur', 'onFocus']),
    ...pick(altCoreCardHeaderStoryMeta.args ?? {}, ['headerText', 'tagText', 'tagVariant', 'headerIcon']),
    annotation: 'Annotation',
    hasAnnotationSlot: false,
  },
} satisfies TAltCoreCardSelectMeta

export default meta
type Story = StoryObj<IAltCoreCardSelectProps>

export const Playground: Story = { args: {} }
