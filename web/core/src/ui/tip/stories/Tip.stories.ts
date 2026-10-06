import { html } from 'lit'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/tip'

import {
  createCoreTipProps,
  type IYCoreTipProps,
  EYCoreTipType,
} from '../models/types'
import {
  YCoreTipTagName as tagName,
} from '~shared/constants'

import { storyControlsTable } from '~shared/.storybook/tables'

import '~core/ui/simpleButton'

import yCoreDropdownStoryMeta from '~core/ui/dropdown/stories/Dropdown.stories'
import { onVisibleEmit } from '~shared/.storybook/argTypes'
import type { TYCoreTipActionEvents } from '../models/types/events'

const { type, offset, padding } = createCoreTipProps()

export interface IYCoreLinkStoryProps {
  tipContent: string
}

type YCoreTipMeta = Meta<IYCoreTipProps & IYCoreLinkStoryProps & TYCoreTipActionEvents>

/**
 * ## Core Tip
 */
const meta: YCoreTipMeta = {
  title: 'Tip',
  id: 'tip',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({ type, trigger, isOpen, placement, strategy, offset, padding, transition, tipContent, inline }) => {
    return html`
      <div style="width: 300px; height: 300px; border: 1px dashed; display: flex; justify-content: center; align-items: center;border-radius: 10px;">
        <y-core-tip .type=${type} .trigger=${trigger} .isOpen=${isOpen} .placement=${placement} .strategy=${strategy} .offset=${offset} .padding=${padding} .transition=${transition} .inline=${inline}>
          <y-core-simple-button slot="activator">
            <span>Нажмите меня</span>
          </y-core-simple-button>

          <div slot="content">${tipContent}</div>
        </y-core-tip>
      </div>
    `
  },
  argTypes: {
    ...yCoreDropdownStoryMeta.argTypes,
    type: {
      control: 'select',
      description: 'Цвет выпадающей области и текста',
      options: Object.values(EYCoreTipType),
    },
    onVisible: onVisibleEmit,
    tipContent: {
      type: 'string',
      description: 'Текст который будет отображаться в компоненте через слот',
      ...storyControlsTable,
    },
    disabled: {
      control: 'boolean',
      description: 'Управление активностью компонента',
    },
  },
  args: {
    ...yCoreDropdownStoryMeta.args,
    padding,
    type,
    offset,
    onVisible: fn(),
    tipContent: 'Подсказка',
  },
} satisfies YCoreTipMeta

export default meta
type Story = StoryObj<IYCoreTipProps>

export const Playground: Story = { args: {} }
