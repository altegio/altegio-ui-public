import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/error'

import { YCoreAnnotationTagName as tagName } from '~shared/constants'

import {
  createCoreErrorExternalProps,
  type IYCoreErrorExternalProps,
} from '~core/ui/error/models/types'

import type { IShowErrorsStoryProps } from '~shared/.storybook/argTypes'
import {
  errors as errorsArgType,
  showErrors as showErrorsArgType,
  isLongText as isLongTextArgType,
  type ITextStoryProps,
} from '~shared/.storybook/argTypes'
import { getComponentStateTable } from '~shared/.storybook/tables'
import { SINGLE_ERROR, LOREM_IPSUM } from '~shared/.storybook/constants'

const { errors } = { ...createCoreErrorExternalProps() }

export interface IYCoreErrorStoryProps extends IShowErrorsStoryProps, ITextStoryProps {}

type IYCoreErrorMeta = IYCoreErrorExternalProps & IYCoreErrorStoryProps

/**
 * ## Error
 * Базовый error для полей ввода
 */
const meta: Meta<IYCoreErrorMeta> = {
  title: '⚙️ Error',
  id: 'error',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    errors,
    showErrors,
    isLongText,
  }) => {
    const computedErrors = errors ?? showErrors

    return html`
      <y-core-error
        .errors=${
          isLongText
            ? showErrors.length > 1
              ? [
                LOREM_IPSUM,
                LOREM_IPSUM,
              ]
              : [LOREM_IPSUM]
            : computedErrors
        }
      >
      </y-core-error>
    `
  },
  argTypes: {
    errors: {
      ...errorsArgType,
      ...getComponentStateTable(errors),
    },

    // Story Controls
    showErrors: showErrorsArgType,
    isLongText: isLongTextArgType,
  },
  args: {
    ...createCoreErrorExternalProps(),
    showErrors: SINGLE_ERROR,
    errors: undefined,
    isLongText: false,
  },
} satisfies Meta<IYCoreErrorMeta>

export default meta
type Story = StoryObj<IYCoreErrorMeta>

export const Playground: Story = { args: {} }
