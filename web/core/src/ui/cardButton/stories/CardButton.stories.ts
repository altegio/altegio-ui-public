import { html, nothing } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreCardButtonProps,
  type IAltCoreCardButtonProps,
  type TAltCoreCardButtonEvents,
} from '~core/ui/cardButton/models/types'
import { AltCoreCardButtonTagName as tagName } from '~shared/constants'

import { getComponentContentTable, storyControlsTable } from '~shared/.storybook/tables'

import { EAltCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { altMagic } from '~shared/icons'

import altCoreCardWrapperStoryMeta from '~core/ui/cardWrapper/stories/CardWrapper.stories'
import altCoreCardHeaderStoryMeta from '~core/ui/cardHeader/stories/CardHeader.stories'

import '~core/ui/cardButton'
import '~core/ui/cardIcon'

const { annotation } = createCoreCardButtonProps()

export interface IAltCoreCardButtonStorySlots {
  showCardIcon: boolean
}

type TAltCoreCardButtonMeta = Meta<IAltCoreCardButtonProps & IAltCoreCardButtonStorySlots & Pick<TAltCoreCardButtonEvents, 'onBlur' | 'onFocus'> & {
  onClick: (event: Event) => void
  hasAnnotationSlot: boolean
}>

/**
 * ## Core CardButton
 */
const meta: TAltCoreCardButtonMeta = {
  title: 'Cards/✅ CardButton',
  id: 'cardButton',
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
    hasAnnotationSlot,
    onClick,
    onBlur,
    onFocus,
  }) => {
    return html`
      <alt-core-card-button
        .disabled=${disabled}
        .hoverable=${hoverable}
        .focusable=${focusable}
        .size=${size}
        .headerText=${headerText}
        .tagText=${tagText}
        .tagVariant=${tagVariant}
        .headerIcon=${headerIcon}
        .annotation=${annotation}
        @click=${onClick}
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

        ${hasAnnotationSlot
          ? html`<span slot="annotation">Slot for annotation text</span>`
          : nothing
        }
      </alt-core-card-button>
    `
  },
  argTypes: {
    ...pick(altCoreCardWrapperStoryMeta.argTypes ?? {}, ['disabled', 'hoverable', 'focusable', 'size']),
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
    ...pick(altCoreCardWrapperStoryMeta.argTypes ?? {}, ['showCardIcon']),

    // Component Events
    ...pick(altCoreCardWrapperStoryMeta.argTypes ?? {}, ['onClick', 'onBlur', 'onFocus']),
  },
  args: {
    ...pick(altCoreCardWrapperStoryMeta.args ?? {}, ['disabled', 'hoverable', 'focusable', 'size', 'showCardIcon', 'onClick', 'onBlur', 'onFocus']),
    ...pick(altCoreCardHeaderStoryMeta.args ?? {}, ['headerText', 'tagText', 'tagVariant', 'headerIcon']),
    annotation: 'Annotation',
    hasAnnotationSlot: false,
  },
} satisfies TAltCoreCardButtonMeta

export default meta
type Story = StoryObj<IAltCoreCardButtonProps>

export const Playground: Story = { args: {} }
