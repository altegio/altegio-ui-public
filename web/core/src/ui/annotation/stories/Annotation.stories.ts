import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/annotation'

import {
  type IAltCoreAnnotationExternalProps,
  createCoreAnnotationExternalProps,
} from '~core/ui/annotation/models/types'

import { AltCoreAnnotationTagName as tagName } from '~shared/constants'

import {
  disabled as disabledArgType,
  isLongText as isLongTextArgType,
  type ITextStoryProps,
} from '~shared/.storybook/argTypes'
import { getComponentContentTable, getComponentStateTable } from '~shared/.storybook/tables'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

const { text, disabled } = createCoreAnnotationExternalProps()

export interface IAltCoreAnnotationStoryProps extends ITextStoryProps {}

type TAltCoreAnnotationMeta = IAltCoreAnnotationExternalProps & IAltCoreAnnotationStoryProps

/**
 * ## Core Annotation
 * Supporting text for input fields
 */
const meta: Meta<TAltCoreAnnotationMeta> = {
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
      <alt-core-annotation
        .disabled=${disabled}
      >
        <div slot="annotation">
          ${computedText}
        </div>
      </alt-core-annotation>
    `
  },
  argTypes: {
    disabled: {
      ...disabledArgType,
      ...getComponentStateTable(disabled),
    },
    text: {
      type: 'string',
      description: 'Annotation text',
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
} satisfies Meta<TAltCoreAnnotationMeta>

export default meta
type Story = StoryObj<TAltCoreAnnotationMeta>

export const Playground: Story = { args: {} }
