import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/annotation'

import {
  type IYCoreAnnotationExternalProps,
  createCoreAnnotationExternalProps,
} from '~core/ui/annotation/models/types'

import { YCoreAnnotationTagName as tagName } from '~shared/constants'

import {
  disabled as disabledArgType,
  isLongText as isLongTextArgType,
  type ITextStoryProps,
} from '~shared/.storybook/argTypes'
import { getComponentContentTable, getComponentStateTable } from '~shared/.storybook/tables'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

const { text, disabled } = createCoreAnnotationExternalProps()

export interface IYCoreAnnotationStoryProps extends ITextStoryProps {}

type TYCoreAnnotationMeta = IYCoreAnnotationExternalProps & IYCoreAnnotationStoryProps

/**
 * ## Core Annotation
 * Базовый annotation для полей ввода
 */
const meta: Meta<TYCoreAnnotationMeta> = {
  title: '⚙️ Annotation',
  id: 'annotation',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    text,
    isLongText,
  }) => {
    const computedText = isLongText ? LOREM_IPSUM : text

    return html`
      <y-core-annotation
        .disabled=${disabled}
      >
        <div slot="annotation">
          ${computedText}
        </div>
      </y-core-annotation>
    `
  },
  argTypes: {
    disabled: {
      ...disabledArgType,
      ...getComponentStateTable(disabled),
    },
    text: {
      type: 'string',
      description: 'Текст аннотации',
      control: 'text',
      ...getComponentContentTable(text),
    },

    // Story Controls
    isLongText: isLongTextArgType,
  },
  args: {
    ...createCoreAnnotationExternalProps(),
    text: 'Annotation text',
    isLongText: false,
  },
} satisfies Meta<TYCoreAnnotationMeta>

export default meta
type Story = StoryObj<TYCoreAnnotationMeta>

export const Playground: Story = { args: {} }
