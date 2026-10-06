import { html, nothing } from 'lit'
import { pick } from 'radash'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreCardButtonProps,
  type IYCoreCardButtonProps,
  type TYCoreCardButtonEvents,
} from '~core/ui/cardButton/models/types'
import { YCoreCardButtonTagName as tagName } from '~shared/constants'

import { getComponentContentTable, storyControlsTable } from '~shared/.storybook/tables'

import { EYCoreColorIconVariant } from '~core/ui/colorIcon/models/types'
import { yMagic } from '~shared/icons'

import yCoreCardWrapperStoryMeta from '~core/ui/cardWrapper/stories/CardWrapper.stories'
import yCoreCardHeaderStoryMeta from '~core/ui/cardHeader/stories/CardHeader.stories'

import '~core/ui/cardButton'
import '~core/ui/cardIcon'

const { annotation } = createCoreCardButtonProps()

export interface IYCoreCardButtonStorySlots {
  showCardIcon: boolean
}

type TYCoreCardButtonMeta = Meta<IYCoreCardButtonProps & IYCoreCardButtonStorySlots & Pick<TYCoreCardButtonEvents, 'onBlur' | 'onFocus'> & {
  onClick: (event: Event) => void
  hasAnnotationSlot: boolean
}>

/**
 * ## Core CardButton
 */
const meta: TYCoreCardButtonMeta = {
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
      <y-core-card-button
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
              <y-core-card-icon
                .icon=${yMagic}
                .variant=${EYCoreColorIconVariant.GREY}
                slot="before"
              >
              </y-core-card-icon>
            `
          : nothing
        }

        ${hasAnnotationSlot
          ? html`<span slot="annotation">Slot for annotation text</span>`
          : nothing
        }
      </y-core-card-button>
    `
  },
  argTypes: {
    ...pick(yCoreCardWrapperStoryMeta.argTypes ?? {}, ['disabled', 'hoverable', 'focusable', 'size']),
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
    ...pick(yCoreCardWrapperStoryMeta.argTypes ?? {}, ['showCardIcon']),

    // Component Events
    ...pick(yCoreCardWrapperStoryMeta.argTypes ?? {}, ['onClick', 'onBlur', 'onFocus']),
  },
  args: {
    ...pick(yCoreCardWrapperStoryMeta.args ?? {}, ['disabled', 'hoverable', 'focusable', 'size', 'showCardIcon', 'onClick', 'onBlur', 'onFocus']),
    ...pick(yCoreCardHeaderStoryMeta.args ?? {}, ['headerText', 'tagText', 'tagVariant', 'headerIcon']),
    annotation: 'Annotation',
    hasAnnotationSlot: false,
  },
} satisfies TYCoreCardButtonMeta

export default meta
type Story = StoryObj<IYCoreCardButtonProps>

export const Playground: Story = { args: {} }
