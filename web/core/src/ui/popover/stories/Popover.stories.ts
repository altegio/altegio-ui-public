import { html } from 'lit'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/popover'
import '~core/ui/button'

import { YCorePopoverTagName as tagName } from '~shared/constants'
import {
  createCorePopoverProps,
  type IYCorePopoverProps,
  type TYCorePopoverActionEvents,
} from '~core/ui/popover/models/types'
import { getComponentContentTable, getComponentEmitsTable } from '~shared/.storybook/tables'
import {
  isLongText as isLongTextArgType,
} from '~shared/.storybook/argTypes'
import type { ITextStoryProps } from '~shared/.storybook/argTypes'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

import yCoreTipStoryMeta from '~core/ui/tip/stories/Tip.stories'

const {
  submitText,
  cancelText,
} = createCorePopoverProps()

type TYCorePopoverMeta = Meta<IYCorePopoverProps & TYCorePopoverActionEvents & ITextStoryProps>

/**
 * ## Core Popover
 *
 * Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-%7C-Components-(IN-PROGRESS)?node-id=1844-17952&t=26Sg15e6zMoONphe-0)
 */
const meta: TYCorePopoverMeta = {
  title: 'Popover',
  id: 'popover',
  component: tagName,
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    trigger,
    isOpen,
    offset,
    padding,
    placement,
    strategy,
    type,
    transition,
    submitText,
    cancelText,
    isLongText,
    inline,
    onCancel,
    onSubmit,
  }) => html`
    <div style="width: 300px; height: 300px; border: 1px dashed; display: flex; justify-content: center; align-items: center;border-radius: 10px;">
      <y-core-popover
        .trigger=${trigger}
        .isOpen=${isOpen}
        .offset=${offset}
        .padding=${padding}
        .placement=${placement}
        .strategy=${strategy}
        .type=${type}
        .transition=${transition}
        .submitText=${submitText}
        .cancelText=${cancelText}
        .inline=${inline}
        @cancel=${onCancel}
        @submit=${onSubmit}
      >
        <y-core-button label="Нажмите меня" slot="activator"></y-core-button>
        
        <div slot="content">
          <span style="width: 218px;display: block;">${isLongText ? LOREM_IPSUM : 'Контент поповера'}</span>
        </div>
      </y-core-popover>
    </div>
  `,
  argTypes: {
    ...yCoreTipStoryMeta.argTypes,
    submitText: {
      type: 'string',
      description: 'Текст кнопки подтверждения',
      ...getComponentContentTable(submitText),
    },
    cancelText: {
      type: 'string',
      description: 'Текст кнопки отмены',
      ...getComponentContentTable(cancelText),
    },
    onCancel: {
      type: 'function',
      description: 'Событие закрытие поповера',
      ...getComponentEmitsTable(),
    },
    onSubmit: {
      type: 'function',
      description: 'Событие подтверждение целевого действия',
      ...getComponentEmitsTable(),
    },
    isLongText: isLongTextArgType,
  },
  args: {
    ...yCoreTipStoryMeta.args,
    submitText: 'Далее',
    cancelText: 'Отмена',
    onCancel: fn(),
    onSubmit: fn(),
  },
}

export default meta
type Story = StoryObj<IYCorePopoverProps>

export const Playground: Story = { args: {} }
